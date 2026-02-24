import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";

export default function AdminDashboard(){

  const navigate = useNavigate();

  const [orders,setOrders] = useState([]);
  const [products,setProducts] = useState([]);
  const [users,setUsers] = useState([]);

  const [activePage,setActivePage] = useState("dashboard");

  useEffect(()=>{

    const role = localStorage.getItem("role");

    if(role !== "admin"){
      navigate("/home");
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setOrders(storedOrders.reverse());
    setProducts(storedProducts);
    setUsers(storedUsers);

  },[]);

  const totalRevenue = orders.reduce(
    (sum,o)=> sum + (o.total || 0),
    0
  );

  const updateStatus = (index,newStatus)=>{

    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify([...updated].reverse()));
  };

  return(

<div style={{minHeight:"100vh",background:"#f5f5f5"}}>

{/* NAVBAR */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#fff",
padding:"15px 40px",
width:"100%",
boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
}}>

<div style={{display:"flex",alignItems:"center",gap:"15px"}}>
<img src={logo} width="40"/>
<h3>Admin Panel</h3>
</div>

<button
onClick={()=>navigate("/")}
style={{
background:"#ff2e8a",
color:"#fff",
border:"none",
padding:"8px 18px",
borderRadius:"5px"
}}
>
Logout
</button>

</div>


<div style={{display:"flex"}}>

{/* SIDEBAR */}

<div style={{
width:"240px",
background:"#ff2e8a",
color:"#fff",
padding:"20px",
minHeight:"calc(100vh - 70px)"
}}>

<SidebarItem text="Dashboard" active={activePage==="dashboard"} onClick={()=>setActivePage("dashboard")} />
<SidebarItem text="Categories" onClick={()=>setActivePage("categories")} />
<SidebarItem text="Products" />
<SidebarItem text="Product List" />
<SidebarItem text="Wholesale Request" />

</div>


{/* CONTENT */}

<div style={{flex:1,padding:"30px"}}>

{activePage==="dashboard" && (

<>
{/* DASHBOARD CARDS */}

<div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>

<Card title="Total Products" value={products.length} color="#4CAF50" icon="📦"/>
<Card title="Total Orders" value={orders.length} color="#2196F3" icon="🛒"/>
<Card title="Total Users" value={users.length} color="#FF9800" icon="👥"/>
<Card title="Revenue" value={`₹ ${totalRevenue}`} color="#9C27B0" icon="💰"/>

</div>


{/* RECENT ORDERS */}

<h2 style={{marginTop:"40px"}}>Recent Orders</h2>

<div style={{
display:"flex",
background:"#ffe4f0",
padding:"12px",
marginTop:"20px",
fontWeight:"bold",
borderRadius:"8px"
}}>

<p style={{width:"90px"}}>Image</p>
<p style={{width:"140px"}}>Category</p>
<p style={{width:"160px"}}>Customer</p>
<p style={{width:"180px"}}>Address</p>
<p style={{width:"120px"}}>Amount</p>
<p>Status</p>

</div>

{orders.map((o,index)=>(

<div key={index} style={{
display:"flex",
alignItems:"center",
background:"#fff",
padding:"15px",
marginTop:"10px",
borderRadius:"10px"
}}>

<img
src={o.items?.[0]?.img}
style={{
width:"70px",
height:"70px",
objectFit:"cover",
borderRadius:"10px"
}}
/>

<p style={{marginLeft:"20px",width:"120px"}}>
{o.items?.[0]?.category}
</p>

<p style={{width:"150px"}}>
{o.name}
</p>

<p style={{width:"200px"}}>
{o.address}
</p>

<p style={{width:"100px"}}>
₹ {o.total}
</p>

<select
value={o.status}
onChange={(e)=>updateStatus(index,e.target.value)}
>
<option>Pending</option>
<option>Confirmed</option>
<option>Delivered</option>
</select>

</div>

))}

</>

)}

{activePage==="categories" && (
<h2>Categories Page (Future Design)</h2>
)}

</div>

</div>

</div>
  );
}



function SidebarItem({text,active,onClick}){

return(
<p
onClick={onClick}
style={{
padding:"10px",
marginTop:"10px",
background:active ? "#fff":"transparent",
color:active ? "#ff2e8a":"#fff",
borderRadius:"5px",
cursor:"pointer"
}}
>
{text}
</p>
);
}



function Card({title,value,color,icon}){

return(
<div style={{
background:"#fff",
padding:"20px",
borderRadius:"10px",
minWidth:"200px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>
<div>
<h3>{value}</h3>
<p>{title}</p>
</div>

<div style={{
fontSize:"28px",
color:color
}}>
{icon}
</div>

</div>
);
}