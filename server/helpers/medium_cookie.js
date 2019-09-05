const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const CookieController = require('../graphql/mongo/cookie.controller');
const Cookie = require('../graphql/mongo/cookie.model');

const COOKIE_VARIABLES = ["__cfduid", "uid", "_ga", "sid"];
const COOKIE_FILE_PATH = path.resolve(__dirname, 'saved_cookie.json');
const URL_CHECK_INTERVAL = 500;
const QUEUE_URL = 'https://medium.com/me/list/queue';
const SUCCESS_URL = 'https://medium.com/';

const formatCookie = (cookiesArr) => {
    let back = "";

    cookiesArr.forEach((variable) => {
        if (COOKIE_VARIABLES.includes(variable.name)) {
            back = back.concat(`${variable.name}=${variable.value};`);
        }
    });
    return (back);
};

const saveCookie = async (page) => {
    const cookiesArray = await page.cookies();
    let savedCookie = await CookieController.saveCookie(cookiesArray, config.mediumCookieRef);
    return (savedCookie);
};

const getSavedCookie = async () => {
    const cookies = await CookieController.getCookie(config.mediumCookieRef);
    return (cookies);
};

const verifySuccess = async (page, counter) => {
    const url = await page.url();

    console.log("URL -> ", url);
    return (new Promise((resolve) => {
        if (counter === 20) {
            throw "timeout cookie generation";
        } else if (url === SUCCESS_URL) {
            saveCookie(page).then((result) => resolve(result));
        } else {
            setTimeout(async function () {
                verifySuccess(page, counter + 1).then(() => resolve());
            }, URL_CHECK_INTERVAL);
        }
    }))
};

const verifyExistingCookie = async (browser) => {
    try {
        const page = await browser.newPage();
        const cookies = await CookieController.getCookie(config.mediumCookieRef);

        if (cookies) {
            console.log("verifying exisiting cookies : ", cookies.length);
            for (let cookie of cookies) {
                await page.setCookie(cookie)
            }
            await page.goto(QUEUE_URL);
            const url = await page.url();
            console.log(url);
            return (url === QUEUE_URL) ? "valid" : "invalid";
        }
        return "not found";
    } catch (e) {
        console.log("Error : ", e);
        return (JSON.stringify(e));
    }
};

const generateCookie = async () => {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    let cookieStatus = await verifyExistingCookie(browser);
    const page = await browser.newPage();
    let cookie = null;

    console.log("Cookie status : ", cookieStatus);
    if (cookieStatus === "valid") {
        console.log("Generated cookies : valid");
        cookie = await getSavedCookie();
    } else {
        console.log(`Generated cookies : ${cookieStatus}`);
        console.log("URL -> ", config.mediumLoginLink);
        await page.goto(config.mediumLoginLink);
        cookie = await verifySuccess(page, 0);
    }
    await browser.close();
    return (cookie);
};

const getCookie = async () => {
    let cookie = await generateCookie();

    if (cookie) {
        return (formatCookie(cookie));
    }
    return null;
};

module.exports = {
    generateCookie,
    getCookie
};