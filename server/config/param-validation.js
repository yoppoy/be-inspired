const Joi = require('joi');

module.exports = {
  login: {
    body: {
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().required(),
    }
  }
}
