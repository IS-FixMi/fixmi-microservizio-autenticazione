import React, { useState, useEffect } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { loginRequest } from "../../utils/connection";

import Status from "../../utils/statusEnum";
import TwoFa from "../twofa/twoFa";
import '../../style.css';
import Navbar from "../navbar";
import Footer from "../footer";
import FormLogin from "./formLogin.tsx";
import { setToken } from "../../utils/cookie";

function Login() {
    const [status, setStatus] = useState<Status>(Status.Start);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twofa, setTwofa] = useState("");

    const { showBoundary } = useErrorBoundary();

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
        setEmail(e.target.elements.email.value);
        setPassword(e.target.elements.password.value);
        setStatus(Status.FirstSubmit);
    }

    useEffect(() => {
        if (status === Status.TwoFaSubmitted) {
            const fetchData = async () => {
                fetch(loginRequest(email, password, twofa))
                    .then(async (response) => {
                        if (response.status === 200) {
                            const body = await response.json();
                            setToken(body.token);
                            setStatus(Status.Success);
                        } else {
                            showBoundary(await response.json());
                        }
                    })
                    .catch((error) => {
                        showBoundary(error);
                    });
            };
            fetchData();
        }
    }, [status, email, password, twofa, showBoundary]);

    if (status === Status.FirstSubmit) {
        return (
            <TwoFa email={email} setTwofa={setTwofa} setStatus={setStatus} />
        );
    }

    if (status === Status.Success) {
        return (
            <div className="flex justify-center items-center h-full pt-20 pb-20">
                <div className="w-3/4 lg:w-3/4 xl:w-2/4">
                    <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Accesso Effettuato con Successo</div>
                            <p className="text-gray-700 text-base">
                                Hai effettuato l'accesso con successo.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <a href="./" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block text-center">
                                Visualizza il profilo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <FormLogin onSubmit={handleSubmit} />
        </>
    );
}

export default function LoginPage() {
    return (
        <>
            <Navbar />
            <div className="main_div">
                <div className="inner_div">
                    <ErrorBoundary FallbackComponent={Fallback}>
                        <Login />
                    </ErrorBoundary>
                </div>
            </div>
            <Footer />
        </>
    );
}

function Fallback({ error }) {
    const printable = error.error != null ? error.error : error.name;
    return (
        <div className="flex justify-center items-center h-full pt-20 pb-20">
            <div className="w-3/4 lg:w-3/4 xl:w-2/4">
                <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Login Fallito</div>
                        <p className="text-gray-700 text-base">
                            Qualcosa è andato storto: {printable}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <a href="login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block text-center">
                            Ritorna al login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

