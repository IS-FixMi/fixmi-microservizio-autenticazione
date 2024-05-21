import React from "react";

import TwoFaForm from "./twoFaForm";
import { ErrorBoundary } from 'react-error-boundary'
function TwoFa({email,setTwofa,setStatus}){
    return (
       
        <ErrorBoundary FallbackComponent={Fallback}>
            <TwoFaForm email= {email} setTwofa={setTwofa} setStatus={setStatus}/>
        </ErrorBoundary>
        
    )

}

function Fallback({error}){
    return (
        <>
        <h2>Something went Wrong! {error.data}</h2>
        <a href="home">return to Home</a>
        
        </>
    )
}


export default TwoFa;