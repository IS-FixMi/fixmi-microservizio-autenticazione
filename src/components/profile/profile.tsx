import React, { useEffect, useState } from "react";
import { authRequest } from "../../utils/connection";
import Cookies from "js-cookie";
import Footer from "../footer";
import Navbar from "../navbar";
import NotLoggedIn from "./notLoggedIn.tsx";

export default function ProfilePage() {
    const [log, setLog] = useState(false);

    const x = log ? (
        <div className="flex justify-center items-center h-full pt-20 pb-20">
            <div className="w-3/4 lg:w-3/4 xl:w-2/4">
                <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Sei loggato</div>
                        <p className="text-gray-700 text-base">
                            Benvenuto! Sei loggato nel tuo profilo.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex justify-around">
                        <a href="remove" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block text-center">
                            Rimuovi Profilo
                        </a>
                        <a href="logout" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block text-center">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <><NotLoggedIn /></>
    );

    return (
        <>
            <Navbar />
            <div className="main_div">
                <div className="inner_div">{x}</div>
            </div>
            <><AuthChecker setRes={setLog} /></>
            <Footer />
        </>
    );
}

export function AuthChecker({ setRes }) {
    useEffect(() => {
        const token = Cookies.get('token');
        if (token == undefined) {
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
    }, [setRes]);

    return (
        <></>
    );
}

