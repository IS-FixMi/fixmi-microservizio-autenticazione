
import React, {useState, useEffect} from "react"
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { loginRequest } from "../../utils/connection";

import Status from "../../utils/statusEnum";
import TwoFa from "../twofa/twoFa";
import '../../style.css'
import Navbar from "../navbar";
import Footer from "../footer";
import { setToken } from "../../utils/cookie";
//import { json } from "body-parser";
 function Login(){

    const [status,setStatus] = useState<Status>(Status.Start);
    const [email,setEmail]= useState("");
   
    const [password, setPassword]= useState("");
    const [twofa,setTwofa] = useState("");
    
    const {showBoundary} = useErrorBoundary();

    async function handleSubmit(e){
        setEmail(e.target.elements.email.value);
        setPassword(e.target.elements.password.value);
        setStatus(Status.FirstSubmit);
    }
    //TwoFaSubmitted
    useEffect(() => {
    if(status == Status.TwoFaSubmitted){
        const fetchData = async () =>{

            fetch(loginRequest(email,password,twofa))
                   .then(
                        async (response) => {
                            if(response.status==200){
                                const body = await response.json();  
                                    setToken(body.token);
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
            <h1 className="my_h1">Successfully Logged In!</h1>
            
            <a href="home">Go back to homepage</a>
            </>
        )
    }
    //Start
    return (
        <>
       
        <h1 >Login</h1>
        <form  onSubmit={handleSubmit}>
            <div >
            <label  htmlFor="email">Email</label> 
            <input  type="email" placeholder="Email" name="email" required></input>
            </div>
            <div >
            <label  htmlFor="password"> Password</label>
            <input  type="password"placeholder="Password" name="password" required></input>
            </div>
            <button className="my_button" type="submit"> Login</button>
            
        </form>
        <h3><a href="changepass"> Forgot your password?</a></h3>
        <h3><a href="register">Don't have an account? Register </a></h3>
        </>


    )
}



export default function LoginPage(){

    return (<>
    <Navbar/>
    <div className= " main_div">
        <div className="inner_div ">
        <ErrorBoundary FallbackComponent={Fallback}>
            <Login/>
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
        <h2 >Something went Wrong!  {printable}</h2>
        <a href="login">return to Login</a>

        </>
    )
}