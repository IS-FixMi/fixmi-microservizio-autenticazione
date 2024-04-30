import express from 'express'

// '/api/auth/register'
const registerRouter = express.Router();
import { db } from '../server';
import {generate_token, tokenSession} from "../utils/token";
import {hash_pass} from "../utils/hash";
import {ObjectId} from "mongodb";
import {Cliente} from "../classes/Profilo";

/*
method: POST
description: method for registering, provided email, password, two factor authentication
body: email, password, twofa
responses:
200 {text: "Successfully registered!",token}
400 {error: "missing fields", missingFields}
400 {error: "user already exists with given email"}
400 {error:"2fa not correct"}

 */
registerRouter.post('/', async (req, res) => {
    let [email, password, twofa] = [req.body.email, req.body.password, req.body.twofa];
    let missingFields: any={};
    if (email == null){
        missingFields.email = "UNSPECIFIED";
    }
    if (password == null){
        missingFields.password = "UNSPECIFIED";
    }
    if (twofa == null){
        missingFields.twofa = "UNSPECIFIED";
    }
    //missing fields: returns an error
    if(!(Object.keys(missingFields).length ===0)){
        res.status(400);
        res.json({error: "missing fields", missingFields: missingFields})
        return;
    }
    let user =  await db.collection("users").findOne({email: email}) ;
    if (user != null){
        res.status(400);
        res.json({error: "user already exists with given email"});
        return;
    }
    if (twofa != "12345"){
        res.status(400);
        res.json({error:"2fa not correct"});
    }
    let cliente = new Cliente(email,password);
    await db.collection("users").insertOne(cliente);
    let token = generate_token();
    let b = tokenSession.insert(token,new ObjectId(cliente.id));

    // Return a json
    res.json({text: "Successfully registered!",token: token});
});

export default registerRouter;