import Input from "../utils/input"
import Button1 from "../utils/Button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { SignupInput } from "@spc-28/pragyaan-common"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ToastOptions, toast } from "react-toastify"
export default function CA(){
    const navigate= useNavigate();
    const toastOptions: ToastOptions = {
        position: "bottom-right"
      };
    const [postInputs, setPostInputs] = useState<SignupInput>({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });
    
    async function sendRequest(){
        try{
            const res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
            const jwt= res.data;
            localStorage.setItem("token",jwt);
            navigate('/blogs');

        }
        catch(e){
            toast.error("Invalid Credentials !", toastOptions);
        }
    }

    return <div className="pl-2 h-screen flex flex-col justify-center items-center gap-4 w-1/2 max-sm:pb-14">
        <div className="flex flex-col items-center mb-2 max-sm:w-96">
        <p className="font-bold text-4xl ">Create an account</p>
        <p>Already have an account? <u><Link to={"/signin"}>Login</Link></u></p>
        </div>
        <Input label="First Name" ph="Enter First name" type="text" onChange={(e)=>{
            setPostInputs(c=>({...c,firstName:e.target.value}))
        }}/>
        <Input label="Last Name" ph="Enter Last name" type="text" onChange={(e)=>{
            setPostInputs(c=>({...c,lastName:e.target.value}))
        }}/>
        <Input label="Email" ph="Enter email" type="email" onChange={(e)=>{
            setPostInputs(c=>({...c,email:e.target.value}))
        }}/>
        <Input label="Password" ph="Enter password" type="password" onChange={(e)=>{
            setPostInputs(c=>({...c,password:e.target.value}))
        }}/>
        <Button1 label="SignUp" onClick={sendRequest}></Button1>
    </div>
}