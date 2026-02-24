import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/pinkleaf_logo.jpeg";

export default function Checkout(){

  const navigate = useNavigate();

  const [cartItems,setCartItems] = useState([]);
  const [user,setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  useEffect(()=>{

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setUser(userData);

  },[]);

  const totalPrice = cartItems.reduce(
    (total,item)=> total + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = ()=>{

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

 const user = JSON.parse(localStorage.getItem("userData"));

const newOrder = {
  id: Date.now(),
  name: user?.fullName || "User",
  address: user?.address || "N/A",
  items: cartItems,
  total: totalPrice,
  status: "Pending"
};

  existingOrders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(existingOrders));

  localStorage.removeItem("cart");

  navigate(`/order-success/${newOrder.id}`);
};

  return(

    <div style={{background:"#f5f5f5",minHeight:"100vh"}}>

      {/* ✅ FULL NAVBAR SAME AS HOME */}

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

          <span onClick={()=>navigate("/wholesale")} style={{cursor:"pointer"}}>Wholesale</span>

          {/* PROFILE ICON */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/profile")}
          />

          {/* CART ICON */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/cart")}
          />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={{
              background:"#ff2e8a",
              color:"#fff",
              border:"none",
              padding:"6px 14px"
            }}
          >
            Logout
          </button>

        </div>

      </div>


      {/* ✅ BACK BUTTON (NAVBAR KE NICHE) */}

      <div style={{padding:"20px 40px"}}>

        <button
          onClick={()=>navigate("/cart")}
          style={{
            background:"transparent",
            border:"none",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          ← Back to Cart
        </button>

      </div>


      {/* CENTER CONTENT */}

      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        paddingBottom:"40px"
      }}>

        {/* SHIPPING DETAILS */}

        <div style={{
          width:"600px",
          maxWidth:"95%",
          background:"#fff",
          padding:"25px",
          borderRadius:"10px",
          marginBottom:"30px"
        }}>

          <h2>Shipping Details</h2>

          <p><b>Name:</b> {user.fullName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Address:</b> {user.address}</p>

          <h3 style={{marginTop:"20px"}}>Payment Method</h3>
          <p>Cash On Delivery (COD)</p>

        </div>


        {/* ORDER SUMMARY */}

        <div style={{
          width:"600px",
          maxWidth:"95%",
          background:"#fff",
          padding:"25px",
          borderRadius:"10px"
        }}>

          <h2>Order Summary</h2>

          {cartItems.map((item,index)=>(

            <div key={index} style={{
              display:"flex",
              justifyContent:"space-between",
              marginTop:"10px"
            }}>
              <span>{item.name} x {item.quantity || 1}</span>
              <span>₹ {item.price * (item.quantity || 1)}</span>
            </div>

          ))}

          <hr style={{margin:"20px 0"}}/>

          <h2>Total: ₹ {totalPrice}</h2>

          <button
            onClick={placeOrder}
            style={{
              marginTop:"20px",
              width:"100%",
              background:"#ff2e8a",
              color:"#fff",
              border:"none",
              padding:"12px",
              borderRadius:"5px"
            }}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}