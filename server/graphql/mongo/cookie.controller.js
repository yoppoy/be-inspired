const Cookie = require('./cookie.model');

const saveCookie = (values, ref) => {
    return (new Promise((resolve, reject) => {
        Cookie.updateOrCreate(values, ref).then((result, err) => {
            if (err)
                reject(err);
            if (result)
                resolve(result.values);
            resolve(null);
        });
    }));
};

const getCookie = (ref) => {
    return (new Promise((resolve, reject) => {
        Cookie.get(ref).then((result, err) => {
            if (err)
                reject(err);
            if (result)
                resolve(result.values);
            resolve(null);
        });
    }));
};

module.exports = {
    saveCookie,
    getCookie
};