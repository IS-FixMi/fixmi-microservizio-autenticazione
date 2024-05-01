import express from 'express'
import { db } from '../server';
import {generate_token, tokenSession} from "../utils/token";
import {hash_pass} from "../utils/hash";
import {ObjectId} from "mongodb";
import {Cliente} from "../classes/Profilo";
import getMissingFields from "../utils/missingFields";

// '/api/auth/changepass'
const pwdChangeRouter = express.Router();


/*
method: PATCH
description: method for changing password, provided email, new password, two factor authentication
body: email, new_password, twofa
responses:
200 {text: "Successfully changed your password!",token} with cookies : token
400 {error: "missing fields", missingFields}
404 {error:"user not found"}
400 {error:"2fa not correct"}

 */
pwdChangeRouter.patch('/', async (req, res) => {
    let [email, new_password, twofa] = [req.body.email, req.body.new_password, req.body.twofa];
    /*
    let missingFields: any={};
    if (email == null){
        missingFields.email = "UNSPECIFIED";
    }
    if (new_password == null){
        missingFields.new_password = "UNSPECIFIED";
    }
    if (twofa == null){
        missingFields.twofa = "UNSPECIFIED";
    }
    */
    let missingFields= getMissingFields([["email",email],["new_password",new_password],["twofa",twofa]]);

    //missing fields: returns an error
    if(missingFields.length!=0) {
        res.status(400);
        res.json({error: "missing fields", missingFields: missingFields, your_body: req.body})
        return;
    }
    let user =  await db.collection("users").findOne({email: email}) ;
    if(user == null){
        res.status(404);
        res.json({error:"user not found"});
        return;
    }

    if (twofa != "12345"){
        res.status(400);
        res.json({error:"2fa not correct"});
        return;
    }
    await db.collection("users").updateOne({email:email},{$set : {password_hash: hash_pass(new_password)}})
    let token = generate_token();
    let b = tokenSession.insert(token,new ObjectId(user.id));
    res.cookie('token', token);
    // Return a json
    res.json({text: "Successfully changed your password!",token: token});
});

export default pwdChangeRouter;