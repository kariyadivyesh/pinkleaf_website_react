import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/pinkleaf_logo.jpeg";

export default function Wholesale(){

  const navigate = useNavigate();

  const [showMessage,setShowMessage] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();

    // Future: send to backend

    setShowMessage(true);

    setTimeout(()=>{
      setShowMessage(false);
    },3000);
  };

  return(

    <div style={{minHeight:"100vh",background:"#f2f2f2"}}>

      {/* NAVBAR (Same as Home) */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"12px 40px",
        background:"#faf8f8"
      }}>

        <img src={logo} width="40"/>

        <div style={{display:"flex",alignItems:"center",gap:"25px"}}>

          <span onClick={()=>navigate("/home")} style={{cursor:"pointer"}}>Home</span>
          <span onClick={()=>navigate("/retail")} style={{cursor:"pointer"}}>Retail</span>
          <span style={{color:"#ff2e8a",fontWeight:"bold"}}>Wholesale</span>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/profile")}
          />

          <button
            onClick={()=>navigate("/")}
            style={{
              border:"1px solid #007bff",
              background:"transparent",
              padding:"6px 14px"
            }}
          >
            LogOut
          </button>

        </div>

      </div>



      {/* MAIN SECTION */}

      <div style={{
        display:"flex",
        minHeight:"85vh"
      }}>

        {/* LEFT PINK SIDE */}

        <div style={{
          flex:1,
          background:"linear-gradient(135deg,#ff008c,#ff4da6)",
          color:"#fff",
          padding:"60px"
        }}>

          <div style={{fontSize:"60px"}}>🛍</div>

          <h1 style={{marginTop:"20px"}}>Pinkleaf Wholesale</h1>

          <p style={{marginTop:"20px",fontSize:"18px"}}>
            Bulk orders with unbeatable prices for retailers and resellers
          </p>

          <ul style={{marginTop:"30px",lineHeight:"35px",fontSize:"18px"}}>
            <li>Competitive wholesale pricing</li>
            <li>Flexible Payment terms</li>
            <li>Priority Customer Support</li>
          </ul>

          <div style={{marginTop:"60px"}}>
            <h3>CONTACT US</h3>
            <p><br/>+91 82389 45773</p>
            <p><br/>kariyadivyesh@gmail.com</p>
          </div>

        </div>



        {/* RIGHT FORM SIDE */}

        <div style={{
          flex:1,
          padding:"60px"
        }}>

          {showMessage && (
            <div style={{
              background:"#d4edda",
              padding:"10px",
              marginBottom:"20px",
              borderRadius:"5px",
              color:"#155724"
            }}>
              Your request successfully sent!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input required style={inputStyle}/>

            <label>Company Name</label>
            <input required style={inputStyle}/>

            <label>Email Address</label>
            <input required type="email" style={inputStyle}/>

            <label>Phone Number</label>
            <input required style={inputStyle}/>

            <label>Business Address</label>
            <input required style={inputStyle}/>

            <div style={{display:"flex",gap:"20px"}}>

              <div style={{flex:1}}>
                <label>City</label>
                <input required style={inputStyle}/>
              </div>

              <div style={{flex:1}}>
                <label>State</label>
                <input required style={inputStyle}/>
              </div>

            </div>

            <label>GST Number (Optional)</label>
            <input style={inputStyle}/>

            <button
              type="submit"
              style={{
                marginTop:"20px",
                background:"#ff2e8a",
                color:"#fff",
                border:"none",
                padding:"12px",
                width:"100%",
                borderRadius:"6px",
                fontSize:"16px"
              }}
            >
              Submit Request
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width:"100%",
  padding:"10px",
  marginBottom:"15px",
  marginTop:"5px",
  border:"1px solid #ccc",
  borderRadius:"4px"
};