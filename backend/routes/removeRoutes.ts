import express from 'express'
import {tokenSession} from "../utils/token";
import { db } from '../server';
import {hash_pass} from "../utils/hash";
import getMissingFields from "../utils/missingFields";
// /api/auth/remove

const removeRouter = express.Router();

/*
method: DELETE
description: method for removing an account, provided email, password, two factor authentication
body: email, password, twofa
responses:
200 {text: "Successfully removed your account."}
400 {error: "missing fields", missingFields}
404 {error: "user not found" }
400 {error: "wrong password" }
400 {error:"2fa not correct"}

 */
removeRouter.delete('/', async (req, res) => {
    let [email, password, twofa] = [req.body.email, req.body.password, req.body.twofa];
    /*
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

    */
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
        res.status(400);
        res.json({error: "wrong password"})

        return;
    }
    if (twofa != "12345"){
        res.status(400);
        res.json({error:"2fa not correct"});
        return;
    }
    await db.collection("users").deleteOne({id: user.id});
    tokenSession.remove_rev(user.id);
    res.json({text: "successfully removed your account."})


})
export default removeRouter;