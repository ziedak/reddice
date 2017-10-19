import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user";

export default(req, res, next) => {
    const authorizationHeder = req.header('authorization');
    let token;
    if ( authorizationHeder ) {
        token = authorizationHeder.split(' ')[ 1 ];
    }
    if ( token ) {
        jwt.verify(token, config.secretJwt, (err, decoded) => {
            if ( err ) {
                res.status(401).json({ error : 'failed to authenticated' });
            } else {
                new User.query({
                                   where  : { id : decoded.id },
                                   select : [ 'id', 'username', 'email' ]
                               })
                    .fetch()
                    .then(user => {
                        if ( !user ) {
                            res.status(404).json({ error : 'no Such User' });
                        } else {
                            req.currentUser = user;
                            next();
                        }

                    });
            }
        });
    } else {
        res.status(403).json({ error : 'no token provided' });
    }

}