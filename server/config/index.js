const Joi = require('joi');
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(4040),
    MEDIUM_LIMIT: Joi.number()
        .default(0),
    MEDIUM_LOGIN_LINK: Joi.string()
        .required(),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
    MONGO_AUTH: Joi.boolean()
        .default(true),
    MONGO_USER: Joi.string().required()
        .description('Mongo username required for auth'),
    MONGO_PWD: Joi.string().required()
        .description('Mongo password required for auth')
}).unknown().required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);

if (error) {
    console.log(`Config validation error: ${error.message}`);
    throw `Config validation error: ${error.message}`;
}

const index = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mediumLimit: envVars.MEDIUM_LIMIT,
    mediumLoginLink: envVars.MEDIUM_LOGIN_LINK,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongo: {
        host: `${envVars.MONGO_HOST}-${envVars.NODE_ENV}`,
        user: envVars.MONGO_USER,
        password: envVars.MONGO_PWD
    }
};

module.exports = index;
