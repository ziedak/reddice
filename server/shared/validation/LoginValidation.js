import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function ValidateInput(data) {
    let errors = {};
    if ( Validator.isEmpty(data.identifier) ) {
        errors.identifier = 'this username / Email is empty';
    }

    if ( Validator.isEmpty(data.password) ) {
        errors.password = 'this password is empty';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}
