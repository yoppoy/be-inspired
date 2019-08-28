const request = require("request");
const cheerio = require("cheerio");
const config = require('../config/index.js');

const savedBookmarks = {
    url: `https://medium.com/me/list/queue?limit=${config.mediumLimit}`,
    headers: {
        'Cookie': config.mediumCookie
    }
};

const archivedBookmarks = {
    url: `https://medium.com/me/list/archive?limit=${config.mediumLimit}`,
    headers: {
        'Cookie': config.mediumCookie
    }
};

const parseData = (html) => {
    const $ = cheerio.load(html);
    let result = [];

    $(".streamItem .link.link--noUnderline.u-baseColor--link").each(function (i, elem) {
        let bm = {};
        if (i % 2 === 0) {
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

    saved = await requestData(savedBookmarks);
    archived = await requestData(archivedBookmarks);
    result.push(...saved);
    result.push(...archived);
    console.log("Scrapped : ", result.length, " articles");
    return (result);
};

module.exports = scrapData;