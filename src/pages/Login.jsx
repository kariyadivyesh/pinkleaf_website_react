import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "admin@gmail.com";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // AUTO FILL AFTER SIGNUP
  useEffect(()=>{

    const savedData = JSON.parse(localStorage.getItem("userData"));

    if(savedData){
      setEmail(savedData.email);
      setPassword(savedData.password);
    }

  },[]);

  const handleLogin = () => {

    const savedData = JSON.parse(localStorage.getItem("userData"));

    // 🔥 ADMIN LOGIN
    if(email === ADMIN_EMAIL){

      // You can later verify admin password from DB
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");

      navigate("/admin");
      return;
    }

    // 🔥 NORMAL USER LOGIN
    if(savedData && email === savedData.email && password === savedData.password){

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");

      navigate("/home");

    }else{
      alert("Invalid login details");
    }

  };

  return(

    <div style={{
      display:"flex",
      height:"100vh",
      width:"100%",
      position:"relative"
    }}>

      {/* BACK BUTTON */}

      <div
        onClick={()=>navigate("/")}
        style={{
          position:"absolute",
          top:"20px",
          left:"20px",
          fontSize:"22px",
          cursor:"pointer",
          background:"#fff",
          padding:"6px 12px",
          borderRadius:"5px",
          boxShadow:"0 0 5px rgba(0,0,0,0.2)"
        }}
      >
        ←
      </div>


      {/* RIGHT SIDE FORM */}

      <div style={{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#f5f5f5"
      }}>

        <div style={{
          background:"#fff",
          padding:"40px",
          width:"350px",
          borderRadius:"10px",
          boxShadow:"0 0 10px rgba(0,0,0,0.1)"
        }}>

          {/* LOGO */}

          <div style={{textAlign:"center"}}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
              width="50"
            />
          </div>

          <h2 style={{textAlign:"center"}}>Login</h2>
          <p style={{textAlign:"center"}}><br/>Login to your Account</p>

          <p><br/>Email Address</p>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{width:"100%",padding:"10px"}}
          />

          <p><br/>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{width:"100%",padding:"10px"}}
          />

          <button
            onClick={handleLogin}
            style={{
              width:"100%",
              marginTop:"20px",
              padding:"12px",
              background:"#ff2e8a",
              color:"#fff",
              border:"none",
              borderRadius:"5px"
            }}
          >
            Login
          </button>

          <p style={{marginTop:"15px",textAlign:"center"}}>
            Don't have account ?
            <span
              onClick={()=>navigate("/signup")}
              style={{color:"#ff2e8a",cursor:"pointer",marginLeft:"5px"}}
            >
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}