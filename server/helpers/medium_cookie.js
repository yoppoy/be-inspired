const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const COOKIE_VARIABLES = ["__cfduid", "uid", "_ga", "sid"];
const COOKIE_FILE_PATH = path.resolve(__dirname, 'saved_cookie.json');
const URL_CHECK_INTERVAL = 500;
const QUEUE_URL = 'https://medium.com/me/list/queue';
const HOME_URL = 'https://medium.com/';

const formatCookie = (cookiesArr) => {
    let back = "";

    cookiesArr.forEach((variable) => {
        if (COOKIE_VARIABLES.includes(variable.name)) {
            back = back.concat(`${variable.name}=${variable.value};`);
        }
    });
    return (back);
};

const saveCookies = async (page) => {
    const cookiesArray = await page.cookies();

    return (new Promise((resolve, reject) => {
        jsonfile.writeFile(COOKIE_FILE_PATH, cookiesArray, {spaces: 2},
            function (err) {
                if (err) {
                    console.log('The file could not be written.', err)
                    reject(err);
                }
                console.log('Session has been successfully saved');
                resolve();
            })
    }));
};

const getSavedCookies = () => {
    const cookiesExist = fs.existsSync(COOKIE_FILE_PATH);

    if (cookiesExist) {
        const cookiesArr = require(COOKIE_FILE_PATH);
        if (cookiesArr.length !== 0) {
            return cookiesArr;
        }
    }
    return null;
};

const verifyExistingCookies = async (page) => {
    const cookies = getSavedCookies();

    console.log("verifying exisiting cookies");
    if (cookies) {
        for (let cookie of cookies) {
            await page.setCookie(cookie)
        }
        await page.goto(QUEUE_URL);
        const url = await page.url();
        console.log("URL -> ", url);
        return url === QUEUE_URL;
    }
    return false;
};

const verifySuccess = async (page, counter) => {
    const url = await page.url();

    console.log("URL -> ", url);
    return (new Promise((resolve) => {
        if (counter === 20) {
            throw "timeout cookie generation";
        } else if (url === HOME_URL) {
            saveCookies(page).then(() => resolve());
        } else {
            setTimeout(async function () {
                verifySuccess(page, counter + 1).then(() => resolve());
            }, URL_CHECK_INTERVAL);
        }
    }))
};

const generateCookies = async () => {
    const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const cookiesExist = fs.existsSync(COOKIE_FILE_PATH);
    let cookiesValid = false;
    let status;

    if (cookiesExist)
        cookiesValid = await verifyExistingCookies(page);
    if (cookiesValid) {
        console.log("Generated cookies : valid");
        return true;
    } else {
        console.log(`Generated cookies : ${!cookiesExist ? "not found" : "invalid"}`) ;
        console.log("URL -> ", config.mediumLoginLink);
        await page.goto(config.mediumLoginLink);
        await verifySuccess(page, 0);
        console.log("done");
    }
    await browser.close();
    return true;
};

const getCookies = async () => {
    let cookiesGenerated = await generateCookies();
    let cookies;

    if (cookiesGenerated) {
        cookies = await getSavedCookies();
        return (formatCookie(cookies));
    }
    return null;
};

module.exports = {
    generateCookies,
    getCookies
};