const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Cookie Schema
 */
const CookieSchema = new mongoose.Schema({
    values: {
        type: [Object],
        required: true
    },
    ref: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CookieSchema.method({});

/**
 * Statics
 */
CookieSchema.statics = {
    /**
     * Get cookie by ref
     * @returns {Promise<Cookie, APIError>}
     * @param ref
     */
    get(ref) {
        return this.findOne({ref: ref})
            .exec()
            .then((article, err) => {
                if (err)
                    return Promise.reject(err);
                if (article)
                    return article;
                return null;
            });
    },

    /**
     * List articles in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of articles to be skipped.
     * @param {number} limit - Limit number of articles to be returned.
     * @returns {Promise<Cookie[]>}
     */

    /**
     * find or create cookie
     * @returns {Promise<Cookie[]>}
     */
    updateOrCreate(values, ref) {
        return this.findOneAndUpdate(
            {ref: ref},
            {values: values, ref: ref},
            {setDefaultsOnInsert: true, new: true, upsert: true})
    },

    /**
     * List articles in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of articles to be skipped.
     * @param {number} limit - Limit number of articles to be returned.
     * @returns {Promise<Cookie[]>}
     */
    list({skip = 0, limit = 200} = {}) {
        return this.find()
            .sort({createdAt: -1})
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
}
;

/**
 * @typedef Cookie
 */
module.exports = mongoose.model('Cookie', CookieSchema);
