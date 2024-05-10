import React, {  useState } from "react";
import { logoutRequest } from "../../utils/connection";
import Cookies from "js-cookie";
import { AuthChecker } from "./profile";
import Navbar from "../navbar";
import Footer from "../footer";


export default function ProfilePage() {
    const [log, setLog] = useState(false);
    async function handleSubmit(e){
            e.preventDefault();       
            const token = Cookies.get('token');
            if(token == undefined){
                return;
            }
    
            const fetchData = async () => {
    
                fetch(logoutRequest(token))
                    .then(
                        async (response) => {
                            if (response.status == 200) {
                                setLog(false);
                                Cookies.remove('token');
                            } else {
                                Cookies.remove('token');
    
                            }
    
                        }
                    )
            }
            fetchData();
        
    }

    const x = (log) ? (<>
        <h1>Are you sure you want to log out?</h1>
        <form onSubmit= {handleSubmit}><button type="submit">Log out</button></form>
    </>
    ) : (
        <><h2> You've Successfully logged out!</h2><a href="/">Home</a> <a href="/profile/login">Login</a>  <a href="/profile/register">Register</a></>
    )
    return (
        <>
        <Navbar/>
        <AuthChecker setRes = {setLog}/>
        <div className="main_div"><div className="inner_div">{x}</div></div>
        <Footer/>    
        
        </>
    )
}

