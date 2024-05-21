
import React, {useState, useEffect} from "react"
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { registerRequest } from "../../utils/connection";

import Status from "../../utils/statusEnum";
import TwoFa from "../twofa/twoFa";
import Navbar from "../navbar";
import Footer from "../footer";
import { setToken } from "../../utils/cookie";

//import { json } from "body-parser";
 function Register(){

    const [status,setStatus] = useState<Status>(Status.Start);
    const [samePass, setSamePass] = useState<boolean>(true);
    const [email,setEmail]= useState("");
   
    const [password, setPassword]= useState("");
    const [twofa,setTwofa] = useState("");
    
    const {showBoundary} = useErrorBoundary();

    async function handleSubmit(e){
        e.preventDefault();
        if(e.target.elements.password.value != e.target.elements.repeat_password.value){
            setSamePass(false);
            return;
        }
        setSamePass(true);
        setEmail(e.target.elements.email.value);
        setPassword(e.target.elements.password.value);
        setStatus(Status.FirstSubmit);
    }
    //TwoFaSubmitted
    useEffect(() => {
    if(status == Status.TwoFaSubmitted){
        const fetchData = async () =>{

            fetch(registerRequest(email,password,twofa))
                   .then(
                        async (response) => {
                            if(response.status==200){
                                const body = await response.json();  
                                    setToken(body.token)
                                    setStatus(Status.Success);
                               
                            } else{
                                showBoundary(await response.json())
                            }

                        } 
                   ).catch((error) =>{
                    showBoundary(error);
                   })

                    
                
                
        
        }
        fetchData();
    }
    },[status])



    //TwoFa screen
    if(status == Status.FirstSubmit){
        return (
            <TwoFa email={email} setTwofa={setTwofa} setStatus={setStatus} />
        )
    }
    
  
    if(status==Status.Success){
        return(
            <>
            <h1 >Successfully Registered</h1>
            
            <a href="home">Go back to homepage</a>
            </>
        )
    }
    
    //Start
    return (
        <>
        
        <h1>Register</h1>
        <form   onSubmit={handleSubmit}>
            <div >
            
            <label  htmlFor="email">Email</label> 
            <input   type="email" placeholder="Email" name="email" required></input>
            </div>
            <div >
            
            <label  htmlFor="password"> Password</label>
            <input    type="password" placeholder="Password" name="password" required></input>
            </div>
            
            <div>
            <label  htmlFor="repeat_password" > Repeat Password</label>
            <input  type="password" name="repeat_password" required></input>
            </div>
            
            <button type="submit"> Register</button>
                    
        </form>
        <p>{(samePass) ? "" : "Passwords do not match"}</p>
        
        </>


    )
}



export default function RegisterPage(){

    return (<>
    <Navbar/>
    <div className= " main_div">
        <div className="inner_div">
        <ErrorBoundary FallbackComponent={Fallback}>
            <Register/>
        </ErrorBoundary>
        </div>
    </div>
    <Footer/>
    </>)
}
function Fallback({error}){
    const printable = (error.error != null) ? error.error : error.name;
    return (
        <>
        <h2>Something went Wrong!  {printable}</h2>
        <a href="register">return to Register</a>
        <a href="home">return to Home</a>
        
        </>
    )
}
