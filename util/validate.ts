const Ut_validator = require('validatorjs');
const ut_validator = async (body: any, rules: any, customMessages: any, callback: any) => {
    const ut_validation = new Ut_validator(body, rules, customMessages);
    ut_validation.passes(() => callback(null, true));
    ut_validation.fails(() => callback(ut_validation.errors, false));
};
module.exports = ut_validator;