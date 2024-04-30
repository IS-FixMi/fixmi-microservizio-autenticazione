import {ObjectId} from "mongodb";
import PermissionLevel from "../enums/PermissionLevel";
import {hash_pass} from "../utils/hash";
import TaskTag from "../enums/TaskTag";

export abstract class Profilo{
    id: ObjectId;
    email: String;
    password_hash: String;
    permissionLevel: PermissionLevel;

}
export class Cliente extends Profilo{
    constructor(email: String, password: String){
        super();
        this.id = new ObjectId();
        this.email = email;
        this.password_hash = hash_pass(password);
        this.permissionLevel = PermissionLevel.Cliente

    }
}
export class Dipendente extends Cliente{
    nome: String;
    cognome: String;
    dataDiNascita: Date;
    dataDiAssunzione: Date;
    workTags: TaskTag[];
    constructor(email: String,password: String,nome:String, cognome: String, dataDiNascita: Date, dataDiAssunzione: Date, workTags: TaskTag[])  {
        super(email,password);
        this.nome = nome;
        this.cognome = cognome;
        this.dataDiNascita= dataDiNascita;
        this.dataDiAssunzione= dataDiAssunzione;
        this.workTags = workTags;
        this.permissionLevel = PermissionLevel.Dipendente;
    }
    getNascitaString() : String{
        return this.dataDiNascita.toISOString()
    }
    getAssunzioneString(): String{
        return this.dataDiAssunzione.toISOString()
    }
}
export class Manager extends Dipendente{
    constructor(email: String,password: String,nome:String, cognome: String, dataDiNascita: Date, dataDiAssunzione: Date, workTags: TaskTag[])  {
        super(email,password,nome,cognome,dataDiNascita,dataDiAssunzione,workTags);
        this.permissionLevel = PermissionLevel.Manager;
    }
}
