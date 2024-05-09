import React,{useEffect, useState } from "react";
import  { twoFaRequest } from "../../utils/connection";
//import qs from "qs";
import Status from "../../utils/statusEnum";
import { useErrorBoundary } from "react-error-boundary";
function TwoFaForm({email, setTwofa, setStatus}){
    const [res, setRes] = useState([])
    const { showBoundary } = useErrorBoundary()


    useEffect(() => {
        const fetchData = async () =>{

            await fetch(twoFaRequest(email))
                       .then(
                        response =>{
                            setRes(response.body);
                        },
                        error=> {
                            showBoundary(error)
                            
                        }
                       ) 
        } 
        fetchData();
    },[]);
    
    async function handleSubmit(e){
        const twofa = e.target.elements.code.value;
        setTwofa(twofa);
        setStatus(Status.TwoFaSubmitted)
    }
    return (
        <>
            <h2 >Insert the TwoFactor Authentication message that has been sent to your email</h2>
            <form  onSubmit={handleSubmit}>
            <div >
                <input  type="number" name="code" required></input> 
            </div>
                <button  type="submit">Confirm</button>
            </form>
            <p>{res.text}</p>
        </>
    )
}





export default TwoFaForm;
