import express from 'express'
import { db } from '../server';
import {generate_token, tokenSession} from "../utils/token";
import {hash_pass} from "../utils/hash";
import {ObjectId} from "mongodb";
import getMissingFields from "../utils/missingFields";

// '/api/auth/login'
const loginRouter = express.Router();

/*
method: POST
description: method for logging in, provided email, password, two factor authentication
body: email, password, twofa
responses:
200 {text: "Successfully logged in!",token} with cookies: token
400 {error: "missing fields", missingFields}
404 {error: "user not found"}
404 {error: "wrong password"}
400 {error:"2fa not correct"}

 */
loginRouter.post('/', async (req, res) => {
    let [email, password, twofa] = [req.body.email, req.body.password, req.body.twofa];
    let missingFields= getMissingFields([["email",email],["password",password],["twofa",twofa]]);

    //missing fields: returns an error
    if(missingFields.length!=0){
        res.status(400);
        res.json({error: "missing fields", missingFields: missingFields})
        return;
    }
    let user =  await db.collection("users").findOne({email: email}) ;
    if (user == null){
        res.status(404);
        res.json({error: "user not found"});
        return;
    }
    let hash = hash_pass(password);
    if (hash != user.password_hash ){
        res.status(404);
        res.json({error: "wrong password"})

        return;
    }
    if (twofa != "12345"){
        res.status(400);
        res.json({error:"2fa not correct"});
    }
    let token = generate_token();
    let b = tokenSession.insert(token,new ObjectId(user._id));
    res.cookie('token', token);

    // Return a json
    res.json({text: "Successfully logged in!",token: token});
});

export default loginRouter;
