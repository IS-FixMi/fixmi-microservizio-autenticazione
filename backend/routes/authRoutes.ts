import express from 'express'
import {tokenSession} from "../utils/token";
import { db } from '../server';
import getMissingFields from "../utils/missingFields";


// '/api/auth/authenticate'
const authRouter = express.Router();


/*
method: POST
description: method for authenticating an user, provided a token. In case of success, it returns the user's id and permissionlevel
body: token
responses:
200 {text: "success", user_info: {permission , id}}
400 {error: "missing fields", missingFields}
404 {error: "user not found with the given token"}
404 {error: "user doesn't exist or is deleted"}

 */
authRouter.post('/', async (req,res) => {
    let token = req.body.token;
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
    let user = await db.collection("users").findOne({_id: id});
    if(user == null){
        res.status(404);
        res.json({error: "user doesn't exist or is deleted"});
        return;
    }

    res.json({text: "Success", user_info: {permission: user.permissionLevel,id: user.id}});

})
export default authRouter;