import express from 'express'

// '/api/auth/twofa'
const twoFArouter = express.Router();
import { db } from '../server';

/*
method: GET
description: method for getting a two factor authentication, given an email
body: email
responses:
200 {text: "Successfully sent the 2FA code to your email(SPOILER: IT'S 12345)"}
400 {error: "missing fields", missingFields: missingFields}
*/
twoFArouter.get('/', (req, res) => {
    let email = req.body.email;
    let missingFields: any = {}
    if (email== null){
        missingFields.token = "UNSPECIFIED"
    }
    if(!(Object.keys(missingFields).length ===0)){
        res.status(400);
        res.json({error: "missing fields", missingFields: missingFields})
        return;
    }
    // Return a json
    res.json({text: "Successfully sent the 2FA code to your email(SPOILER: IT'S 12345)"});
});

export default twoFArouter;
