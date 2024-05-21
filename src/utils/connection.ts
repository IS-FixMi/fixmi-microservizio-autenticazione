//const PORT = process.env.REACT_APP_BACKEND_PORT || "3001";

import qs from "qs";

const baseURL = "http://127.0.0.1:"+7777;

export function twoFaRequest(email: string){
    const options = {
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: qs.stringify({email: email}),
    }
    return new Request(baseURL.concat("/api/auth/twofa"),options);
}

export function loginRequest(email:string, password: string, twofa: string){
    const options = {
        method:"POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"
        },
        body: qs.stringify({email:email,password:password,twofa:twofa})
    }
    return new Request(baseURL.concat("/api/auth/login"),options);
}
export function registerRequest(email:string,password:string,twofa:string){
    const options = {
        method:"POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({email:email,password:password,twofa:twofa})
    }
    return new Request(baseURL.concat("/api/auth/register"),options);
}
export function changePassRequest(email:string, new_password: string, twofa: string){
    const options = {
        method: "PATCH",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({email:email, new_password: new_password,twofa:twofa})
    }
    return new Request(baseURL.concat("/api/auth/changepass"),options);
}
export function removeRequest(email:string,password: string, twofa: string){
    const options = {
        method: "DELETE",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({email:email, password: password,twofa:twofa})
    }
    
    return new Request(baseURL.concat("/api/auth/remove"),options);
}
export function logoutRequest(token:string){
    const options = {
        method: "DELETE",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/auth/logout"),options);
}
export function authRequest(token:string){
    const options = {
        method:"POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/auth/authenticate"),options);
}