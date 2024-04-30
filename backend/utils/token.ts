

import {ObjectId} from "mongodb";
import {randomInt} from "node:crypto";
//bijective map class
class TokenSession{
    inner: Map<String, ObjectId>;
    //the first String is the ObjectId, as it doesn't work with map as a key :(
    reverse: Map<String, String>;
    constructor(){
        this.inner = new Map<String,ObjectId>();
        this.reverse = new Map<String,String>();
    }
    get(token: String) : ObjectId| undefined{
        console.log("token: "+token +  " map: "+this.inner.entries() + " result: " + this.inner.get(token))
        return this.inner.get(token)
    }

    //TODO: fare in modo che sia una bijez.
    insert(token: String, id: ObjectId): boolean{

        if (this.inner.has(token)){
            return false;
        }
        //controllo che l'object id non sia presente
        let already_existing_token = this.reverse.get(id.toString());
        if (already_existing_token != undefined){
            //delete the already present entries
            this.inner.delete(already_existing_token);
            this.reverse.delete(id.toString());
        }

        //insert the new entries
        this.inner.set(token,id);
        this.reverse.set(id.toString(),token);
        console.log("INNER: " +this.inner + " ENTRIES: "+Array.from( this.inner.entries()));
        console.log("Trying to get the thing: "+ this.inner.get(token));
        return true;
    }
    remove(token: String){
        let id = this.inner.get(token);
        if( id !=undefined) {
            this.reverse.delete(id.toString());
        }
        this.inner.delete(token)

    }
    remove_rev(id: ObjectId){
        let token = this.reverse.get(id.toString());
        this.inner.delete(token);
        this.reverse.delete(id.toString());

    }

}


//current method for simplicity: returns a timestamp + randomInt

export function generate_token(): String{
    return Date.now().toString() +randomInt(0,1000);
}

let tokenSession = new TokenSession();
export {tokenSession};