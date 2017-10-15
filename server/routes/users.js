import express from "express";
import validateInput from "../shared/validation/singupValidation";
import bcrypt from 'bcrypt'
import User from "../models/user";

let router = express.Router();

router.post('/', (req, res) => {

    const { errors, isValid } = validateInput(req.body);
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

export default router;