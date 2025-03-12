import Input from "../utils/input"
import Button1 from "../utils/Button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { SigninInput } from "@spc-28/pragyaan-common"
import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BACKEND_URL } from "../../config"
export default function LP(){
    const naviagte= useNavigate();
    const toastOptions: ToastOptions = {
        position: "bottom-right"
      };
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email:"",
        password:""
    });

    async function sendRequest(){
        try{
            const res= await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
            const jwt= res.data;
            localStorage.setItem("token",jwt);
            naviagte('/blogs');
            
        }
        catch(e){
            toast.error("Invalid Credentials !", toastOptions);
        }
    }

    return <div className="pl-2 h-screen flex flex-col justify-center items-center gap-4 w-1/2 max-sm:pb-14">
        <div className="flex flex-col items-center mb-2 max-sm:w-96">
        <p className="font-bold text-4xl ">Login to account</p>
        <p>Don't have an account? <Link className="underline" to={"/signup"}>Create new</Link></p>
        </div>
        <Input label="Email" ph="Enter email" type="email" onChange={(e)=>{
            setPostInputs(c=>({...c,email:e.target.value}))
        }}/>
        <Input label="Password" ph="Enter password" type="password" onChange={(e)=>{
            setPostInputs(c=>({...c,password:e.target.value}))
        }}/>
        <Button1 label="SignIn" onClick={sendRequest}></Button1>
    </div>
}