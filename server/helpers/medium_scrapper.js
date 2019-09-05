const request = require("request");
const cheerio = require("cheerio");
const config = require('../config/index.js');
const {getCookie} = require('./medium_cookie');

/**
 * There are 2 different types of bookmarks: saved and archived bookmarks
 */
const SAVED_BOOKMARKS_URL = `https://medium.com/me/list/queue?limit=${config.mediumLimit}`;
const ARCHIVED_BOOKMARKS_URL = `https://medium.com/me/list/archive?limit=${config.mediumLimit}`;

const bookmarksURL = (url, cookies) => {
    return ({
        url,
        headers: {
            'Cookie': cookies
        }
    });
};

const parseData = (html) => {
    const $ = cheerio.load(html);
    let result = [];
    let styles;

    $(".streamItem .link.link--noUnderline.u-baseColor--link").each(function (i, elem) {
        let bm = {};
        if (i % 2 === 0) {
            styles = String(elem.parent.next.children[0].attribs.style);
            bm["image"] = styles.substring(styles.indexOf("(") + 2, styles.indexOf(")") - 1).replace("/160/160", "/340/340");
            bm["title"] = elem.children[0].children[0].data;
            bm["author"] = elem.parent.children[1].children[1].prev.children[0].children[0].data;
            bm["description"] = elem.children[1] ? elem.children[1].children[0].data : "";
            bm["url"] = elem.attribs.href;
            bm["time_mins"] = parseInt(elem.next.children[3].next.attribs.title);
            result.push(bm);
        }
    });
    return (result);
};

const requestData = (type) => {
    return new Promise(function (resolve, reject) {
        request(type, function (err, res, html) {
            if (!err && res.statusCode == 200) {
                resolve(parseData(html));
            } else {
                reject(err);
            }
        });
    });
};

const scrapData = async () => {
    let result = [];
    let saved;
    let archived;

    try {
        const cookies = await getCookie();
        console.log("Cookie length : ", cookies.length);
        saved = await requestData(bookmarksURL(SAVED_BOOKMARKS_URL, cookies));
        archived = await requestData(bookmarksURL(ARCHIVED_BOOKMARKS_URL, cookies));
        result.push(...saved);
        result.push(...archived);
        console.log("Scrapped: ", result.length, " articles");
        return (result);
    } catch (e) {
        console.log("Error : ", e);
        return null;
    }
};

module.exports = scrapData;