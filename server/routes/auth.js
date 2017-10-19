import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";

//import Promise from "bluebird";

let router = express.Router();

router.post('/', (req, res) => {

    const { identifier, password } = req.body;

    User.query({
        //  select  : [ 'username', 'password' ],
        where   : { email : identifier },
        orWhere : { username : identifier }
    }).fetch().then(user => {
        if ( user ) {
            if ( bcrypt.compareSync(password, user.get('password_digest')) ) {
                const token = jwt.sign({
                    id       : user.get('id'),
                    username : user.get('username')
                }, config.secretJwt);
                res.json({ token });
            } else {
                res.status(401).json({ errors : { form : 'invalid Credentials' } });
            }
        } else {
            res.status(401).json({ errors : { form : 'invalid Credentials' } });
        }

    });


});

export default router;