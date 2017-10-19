import express from "express";
import authenticateMiddleware from "../middlewares/authenticateMiddleware";

let router = express.Router();

router.post('/',authenticateMiddleware ,(req, res) => {
    res.json({ success : 'cool' });
});

export default router;
