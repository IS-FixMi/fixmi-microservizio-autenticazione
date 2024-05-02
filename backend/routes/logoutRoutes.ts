import express from 'express'
import {tokenSession} from "../utils/token";
import { db } from '../server';
import getMissingFields from "../utils/missingFields";
// '/api/auth/logout'
const logoutRouter = express.Router();

/*
method: DELETE
description: method for logging out, given token
body: token
responses:
200 {text: "Successfully logged out!"}
400 {error: "missing fields", missingFields}
404 {error: "user not found with the given token"}
 */
logoutRouter.delete('/', async (req, res) => {
    let token = req.body.token;
    /*
    let missingFields: any = {}
    if (token == null){
        missingFields.token = "UNSPECIFIED"
    }

     */
    let missingFields= getMissingFields([["token",token]]);

    //missing fields: returns an error
    if(missingFields.length!=0) {
        res.status(400);
        res.json({error: "missing fields", missingFields: missingFields})
        return;
    }
    let id = tokenSession.get(token);
    if (id == undefined){
        res.status(404);
        res.json({error: "user not found with the given token"});
        return;
    }
    tokenSession.remove(token);

    res.json({text: "Successfully logged out"});

})
export default logoutRouter;