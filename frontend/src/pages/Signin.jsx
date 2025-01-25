import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className='flex bg-slate-300 h-screen justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='border bg-white rounded-lg w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={e=>{
            setUsername(e.target.value)
          }} label={"Email"} placeholder={"johndoe@example.com"} />
          <InputBox onChange={e=>{
            setPassword(e.target.value)
          }} label={"Password"} placeholder={""} />
          <div className='pt-4'>
            <Button onClick={async ()=>{
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            }} label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttontext={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
