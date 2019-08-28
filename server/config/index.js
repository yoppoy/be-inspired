const Joi = require('joi');
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MEDIUM_BOOKMARK_URL: Joi.string()
      .default('https://medium.com/me/list/bookmarks'),
  MEDIUM_LIMIT: Joi.number()
      .default(0),
  MEDIUM_COOKIE: Joi.string()
      .required()
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const index = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mediumLimit: envVars.MEDIUM_LIMIT,
  mediumCookie: envVars.MEDIUM_COOKIE,
  mediumBookmarkUrl: envVars.MEDIUM_BOOKMARK_URL,
};

module.exports = index;
