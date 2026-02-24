import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccess(){

  const navigate = useNavigate();
  const { id } = useParams();

  const [order,setOrder] = useState(null);

  useEffect(()=>{

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find(o => o.id.toString() === id);

    setOrder(foundOrder);

  },[id]);

  if(!order) return <h2 style={{padding:"40px"}}>Loading...</h2>;

  return(

    <div style={{
      minHeight:"100vh",
      background:"#f5f5f5",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{
        background:"#fff",
        padding:"40px",
        borderRadius:"10px",
        width:"500px",
        textAlign:"center",
        boxShadow:"0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{color:"#ff2e8a"}}>🎉 Order Confirmed!</h1>

        <p style={{marginTop:"20px"}}>
          Thank you for shopping with PinkLeaf ❤️
        </p>

        <p>Your order has been successfully placed.</p>

        <h3 style={{marginTop:"20px"}}>
          Order ID: #{order.id}
        </h3>

        <p>Estimated Delivery: 3-5 working days</p>

        <h2 style={{marginTop:"20px"}}>
          Total Paid: ₹ {order.total}
        </h2>

        <button
          onClick={()=>navigate("/retail")}
          style={{
            marginTop:"30px",
            background:"#ff2e8a",
            color:"#fff",
            border:"none",
            padding:"12px 30px",
            borderRadius:"5px"
          }}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}