import express from "express";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
let router = express.Router();

function validateInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.username)) {
        errors.username = 'this username is empty';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'this email is empty';
    }
    if (Validator.isEmail(data.email)) {
        errors.email = 'this email is not valid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'this password is empty';
    }
    if (Validator.isEmpty(data.password_confirmation)) {
        errors.password_confirmation = 'this password_confirmation is empty';
    }
    if (!Validator.equals(data.password, data.password_confirmation)) {
        errors.password_confirmation = 'not match password';
    }
    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = 'this timezone is empty';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', (req, res) => {

        const {errors, isValid} = validateInput(req.body);
        if (!isValid) {
            res.status(400).json(errors)
        }

});

export default router;