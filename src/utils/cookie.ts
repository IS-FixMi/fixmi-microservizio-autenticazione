import Cookie from 'js-cookie';
//sets the token as a cookie
export function setToken(token: string){
    Cookie.set('token', token,{path:'/'});
}
export function removeToken(){
    Cookie.remove('token',{path:'/'})
}
