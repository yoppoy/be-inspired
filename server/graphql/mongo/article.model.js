const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Article Schema
 */
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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
ArticleSchema.method({

});

/**
 * Statics
 */
ArticleSchema.statics = {
    /**
     * Get article
     * @returns {Promise<Article, APIError>}
     * @param id
     * @param visible
     */
    setVisibility(id, visible) {
        return this.findOneAndUpdate(
            {_id: id},
            {$setOnInsert: {article: visible}},
            {});
    },

    /**
     * Get article
     * @returns {Promise<Article, APIError>}
     * @param title
     */
    get(title) {
        return this.findOne({title: title})
            .exec()
            .then((article) => {
                if (article) {
                    return article;
                }
                const err = new APIError('No such article exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List articles in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of articles to be skipped.
     * @param {number} limit - Limit number of articles to be returned.
     * @returns {Promise<Article[]>}
     */
    findOrCreate(title) {
        return this.findOneAndUpdate(
            {title: title},
            {$setOnInsert: {title: title}},
            {new: true, upsert: true});
    },

    /**
     * List articles in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of articles to be skipped.
     * @param {number} limit - Limit number of articles to be returned.
     * @returns {Promise<Article[]>}
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
 * @typedef Article
 */
module.exports = mongoose.model('Article', ArticleSchema);
