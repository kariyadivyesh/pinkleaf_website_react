import { useNavigate } from "react-router-dom";

export default function Signup(){

  const navigate = useNavigate();

  const handleSignup = () => {

    const fullName = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(!fullName || !address || !email || !phone || !password || !confirmPassword){
      alert("All fields required");
      return;
    }

    if(password !== confirmPassword){
      alert("Passwords not match");
      return;
    }

    const userData = {
      fullName,
      address,
      email,
      phone,
      password
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/login");
  };

  return(

    <div style={{display:"flex",height:"100vh",width:"100%",position:"relative"}}>

      <div
        onClick={()=>navigate("/login")}
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
          width:"400px",
          borderRadius:"10px",
          boxShadow:"0 0 10px rgba(0,0,0,0.1)"
        }}>

          <div style={{textAlign:"center"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" width="50"/>
          </div>

          <h2 style={{textAlign:"center"}}>Sign Up</h2>

          <p><br/>Full Name</p>
          <input id="fullName" style={{width:"100%",padding:"10px"}} />

          <p><br/>Address</p>
          <input id="address" style={{width:"100%",padding:"10px"}} />

          <p><br/>Email</p>
          <input id="email" style={{width:"100%",padding:"10px"}} />

          <p><br/>Phone Number</p>
          <input id="phone" style={{width:"100%",padding:"10px"}} />

          <p><br/>Password</p>
          <input id="password" type="password" style={{width:"100%",padding:"10px"}} />

          <p><br/>Confirm Password</p>
          <input id="confirmPassword" type="password" style={{width:"100%",padding:"10px"}} />

          <button
            onClick={handleSignup}
            style={{
              width:"100%",
              marginTop:"25px",
              padding:"12px",
              background:"#ff2e8a",
              color:"#fff",
              border:"none",
              borderRadius:"5px"
            }}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}
