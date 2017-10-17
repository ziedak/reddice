import express from "express";
import commonValidation from "../shared/validation/singupValidation";
import bcrypt from "bcrypt";
import User from "../models/user";
//import Promise from "bluebird";
import isEmpty from "lodash/isEmpty";
let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);

    return User.query({
        where   : { email : data.email },
        orWhere : { username : data.username }
    }).fetch()
        .then(user => {
            if ( user ) {
                if ( user.get('username') )
                    errors.username = 'there is a user with such username';
                if ( user.get('email') )
                    errors.email = 'there is a user with such email';
            }
            return {
                errors,
                isValid : isEmpty(errors)
            };
        })

    /*
     // send to request and what the 2 different promises  to validate the return
     //not good for optimisation request  from DB

     return Promise.all([
     User.where({ email : data.email }).fetch().then(user => {
     if ( user ) {
     errors.email = 'there is a user with such email'
     }
     }),
     User.where({ username : data.username }).fetch().then(user => {
     if ( user ) {
     errors.username = 'there is a user with such username'
     }
     })
     ]).then(() => {
     return {
     errors,
     isValid : isEmpty(errors)
     };
     })
     */

}

router.get('/:identifier', (req, res) => {

    User.query({
        select  : [ 'username', 'email' ],
        where   : { email : req.params.identifier },
        orWhere : { username : req.params.identifier }
    }).fetch().then(user => {
        res.json({ user });
    });
});

router.post('/', (req, res) => {

    validateInput(req.body, commonValidation).then(({ errors, isValid }) => {
        if ( isValid ) {
            //insert user in BD

            const { username, password, timezone, email } = req.body;
            const password_digest = bcrypt.hashSync(password, 10);

            User
                .forge(
                    { username, password_digest, email, timezone },
                    { hasTimestamps : true }
                )
                .save()
                .then(user => res.json({ success : true }))
                .catch(err => res.status(500).json({ error : err }));

            // res.json({ success : true })
        } else {
            res.status(400).json(errors)
        }
    });
});

export default router;