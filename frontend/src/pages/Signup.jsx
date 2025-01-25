import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";

const Signup = () => {

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create your account"} />
          <InputBox onChange={e=>{
            setFirstname(e.target.value)
          }} placeholder={"John"} label={"First Name"} />
          <InputBox onChange={e=>{
            setLastname(e.target.value)
          }} placeholder={"Doe"} label={"Last Name"} />
          <InputBox onChange={e=>{
            setUsername(e.target.value)
          }} placeholder={"johndoe@gmail.com"} label={"Email"} />
          <InputBox  onChange={e=>{
            setPassword(e.target.value)
          }} placeholder={"123456"} label={"Password"} />
          <div className="pt-4">
            <Button onClick={async ()=>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
              });
              localStorage.setItem("token", response.data.token)
              alert("Account Creation Successfull, Please Login")
              navigate('/signin')
            }}
             label={"Sign up"} />
          </div>
            <BottomWarning label={"Already have an account?"} to={"/signin"} buttontext={"Sign in"} />
        </div>
      </div>
    </div>
};

export default Signup;
