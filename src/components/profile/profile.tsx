import React, { useEffect, useState } from "react";
import { authRequest } from "../../utils/connection";
import Cookies from "js-cookie";
import Footer from "../footer";
import Navbar from "../navbar";
import NotLoggedIn from "./notLoggedIn.tsx";

export default function ProfilePage() {
    const [log, setLog] = useState(false);


    
    const x = (log) ? (<>
        <h2>You're logged in</h2>
        <a href="remove">Remove Profile</a>
        <a href="logout">Logout</a>
    </>
    ) : (
        <><NotLoggedIn /></>
    )
    return (
        <>
        <Navbar/>

           <div className="main_div"><div className="inner_div">{x}</div></div> 
            <><AuthChecker setRes = {setLog}/></>
        <Footer/>
        </>

    )
}


export function AuthChecker({setRes}){
    useEffect(() => {
        const token = Cookies.get('token');
        if(token == undefined){
            return;
        }

        const fetchData = async () => {

            fetch(authRequest(token))
                .then(
                    async (response) => {
                        if (response.status == 200) {
                            setRes(true);
                        } else {
                            Cookies.remove('token');

                        }

                    }
                )
        }
        fetchData();
    }, [])

    return (
        <></>
    )
}
