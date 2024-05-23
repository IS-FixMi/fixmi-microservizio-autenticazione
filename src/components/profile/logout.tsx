import React, { useState } from "react";
import { logoutRequest } from "../../utils/connection";
import Cookies from "js-cookie";
import { AuthChecker } from "./profile";
import Navbar from "../navbar";
import Footer from "../footer";
import { removeToken } from "../../utils/cookie";


export default function ProfilePage() {
    const [log, setLog] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const token = Cookies.get('token');
        if (token == undefined) {
            return;
        }

        const fetchData = async () => {
            fetch(logoutRequest(token))
                .then(
                    async (response) => {
                        if (response.status === 200) {
                            setLog(false);
                            removeToken();
                        } else {
                            removeToken();
                        }
                    }
                )
        }
        fetchData();
    }

    const x = (log) ? (
        <div className="flex justify-center items-center h-full pt-20 pb-20">
            <div className="w-3/4 lg:w-3/4 xl:w-2/4">
                <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Sei sicuro di voler fare il logout?</div>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex justify-around">
                        <form onSubmit={handleSubmit}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center h-full pt-20 pb-20">
            <div className="w-3/4 lg:w-3/4 xl:w-2/4">
                <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Il logout è avvenuto con successo!</div>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex justify-around">
                        <a href="./" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block text-center">
                            Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <AuthChecker setRes={setLog} />
            <div className="main_div">
                <div className="inner_div">{x}</div>
            </div>
            <Footer />
        </>
    );
}

