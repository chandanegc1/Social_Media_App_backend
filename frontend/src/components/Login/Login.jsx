import React, { useState } from "react";
import "../Login/Login.css";
import { Button, Typography , input} from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { loginUser } from "../../Actions/User";


const Login = () => {
  const [email ,setEmail] = useState("")
  const [password , setPassword] = useState("")
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    console.log(email)
    e.preventDefault();
    dispatch(loginUser(email , password));

  };
  return (
    <>
      <div className="login">
        <form action="" className="loginForm" onSubmit={loginHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Social App
          </Typography>

          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required  placeholder="Email" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

          <Link to="/forgot/password">
            <Typography>forgot Password </Typography>
          </Link>
          <Link to="/register">
            <Typography>New User?</Typography>
          </Link>
          <button>Login</button>
        </form>
      </div> 
    </>
  );
};

export default Login;
