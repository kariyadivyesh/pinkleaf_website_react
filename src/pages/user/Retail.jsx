import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../../assets/pinkleaf_logo.jpeg";

import tshirtImg from "../../assets/tshirt_main.jpeg";
import jeansImg from "../../assets/jeans_main.jpeg";
import westernImg from "../../assets/western_main.jpeg";
import cordsetImg from "../../assets/cordset_main.jpeg";
import kurtiImg from "../../assets/kurti_main.jpeg";

export default function Retail(){

  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory,setActiveCategory] = useState("all");
  const [cartCount,setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // 🔥 READ CATEGORY FROM URL
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");

    if(categoryFromURL){
      setActiveCategory(categoryFromURL);
    } else {
      setActiveCategory("all");
    }
  },[location.search]);

  // 🔥 LOAD CART COUNT
  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  },[]);

  // 🔥 ADD TO CART FUNCTION
  const addToCart = (product) => {

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(product);

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setCartCount(existingCart.length);
  };


  // PRODUCTS
  const products = [

    {name:"Black Fancy T-shirt",price:600,size:"M",category:"tshirt",img:tshirtImg},
    {name:"White Casual T-shirt",price:650,size:"L",category:"tshirt",img:tshirtImg},
    {name:"Premium Cotton T-shirt",price:700,size:"XL",category:"tshirt",img:tshirtImg},

    {name:"Blue Denim Jeans",price:1000,size:"M",category:"jeans",img:jeansImg},
    {name:"Slim Fit Jeans",price:1200,size:"L",category:"jeans",img:jeansImg},
    {name:"Classic Denim Jeans",price:1100,size:"XL",category:"jeans",img:jeansImg},

    {name:"Yellow Designer Kurti",price:800,size:"M",category:"kurti",img:kurtiImg},
    {name:"Festive Kurti Style",price:950,size:"L",category:"kurti",img:kurtiImg},
    {name:"Daily Wear Kurti",price:750,size:"XL",category:"kurti",img:kurtiImg},

    {name:"Western Style Outfit",price:1400,size:"M",category:"western",img:westernImg},
    {name:"Modern Western Wear",price:1500,size:"L",category:"western",img:westernImg},

    {name:"Cordset Premium",price:1600,size:"M",category:"cordset",img:cordsetImg},
    {name:"Summer Cordset",price:1700,size:"L",category:"cordset",img:cordsetImg},
    {name:"Elegant Cordset",price:1800,size:"XL",category:"cordset",img:cordsetImg},

    {name:"Trendy Kurti Design",price:850,size:"M",category:"kurti",img:kurtiImg},

  ];

  const filteredProducts =
    activeCategory==="all"
    ? products
    : products.filter(p=>p.category===activeCategory);

  return(

    <div style={{background:"#f5f5f5",minHeight:"100vh"}}>

      {/* NAVBAR */}

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

          <span style={{color:"#ff2e8a",fontWeight:"bold"}}>Retail</span>

          <span onClick={()=>navigate("/wholesale")} style={{cursor:"pointer"}}>Wholesale</span>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/profile")}
          />

          {/* 🔥 CART WITH COUNT */}
          <div onClick={()=>navigate("/cart")}
          style={{position:"relative",cursor:"pointer"}}>
            
            <img 
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              width="22"
            />
            

            {cartCount>0 && (
              <span style={{
                position:"absolute",
                top:"-8px",
                right:"-10px",
                background:"red",
                color:"#fff",
                borderRadius:"50%",
                padding:"2px 6px",
                fontSize:"12px"
              }}>
                {cartCount}
              </span>
            )}
          </div>

          <button
            onClick={handleLogout}
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


      {/* TITLE + CATEGORY */}

      <div style={{padding:"30px"}}>

        <h1>Shop Collection</h1>
        <p>Discover our latest collection</p>

        <div style={{display:"flex",gap:"15px",marginTop:"20px"}}>

          {[
            {label:"All Products",value:"all"},
            {label:"T-shirts",value:"tshirt"},
            {label:"Jeans",value:"jeans"},
            {label:"Western wear",value:"western"},
            {label:"Cordset",value:"cordset"},
            {label:"Kurti",value:"kurti"}
          ].map(cat=>(

            <button
              key={cat.value}
              onClick={()=>setActiveCategory(cat.value)}
              style={{
                padding:"10px 20px",
                borderRadius:"20px",
                border:"none",
                background: activeCategory===cat.value ? "#ff2e8a":"#e6d3de",
                color: activeCategory===cat.value ? "#fff":"#000",
                cursor:"pointer"
              }}
            >
              {cat.label}
            </button>

          ))}

        </div>

      </div>


      {/* PRODUCT GRID */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
        gap:"20px",
        padding:"20px 40px"
      }}>

        {filteredProducts.map((item,index)=>(

          <div key={index} style={{
            background:"#fff",
            borderRadius:"10px",
            overflow:"hidden",
            boxShadow:"0 0 8px rgba(0,0,0,0.1)"
          }}>

            <img src={item.img}
            style={{width:"100%",height:"350px",objectFit:"cover"}}/>

            <div style={{padding:"15px"}}>

              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>
              <h3 style={{color:"#ff2e8a"}}>₹ {item.price}</h3>

              <button
                onClick={()=>addToCart(item)}
                style={{
                  background:"#ff2e8a",
                  color:"#fff",
                  border:"none",
                  padding:"10px 20px",
                  borderRadius:"5px"
                }}
              >
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}