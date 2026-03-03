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
  const [categories,setCategories] = useState([]);
  const [products,setProducts] = useState([]);

  const normalizeCategory = (cat)=>
    cat?.toLowerCase().replace(/[\s-]/g,"");

  const handleLogout=()=>{
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  /* LOAD PRODUCTS */
  useEffect(()=>{

    const adminProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const staticProducts=[

      {id:1,name:"Black Fancy T-shirt",price:600,size:"M",category:"tshirt",img:tshirtImg},
      {id:2,name:"White Casual T-shirt",price:650,size:"L",category:"tshirt",img:tshirtImg},
      {id:3,name:"Premium Cotton T-shirt",price:700,size:"XL",category:"tshirt",img:tshirtImg},

      {id:4,name:"Blue Denim Jeans",price:1000,size:"M",category:"jeans",img:jeansImg},
      {id:5,name:"Slim Fit Jeans",price:1200,size:"L",category:"jeans",img:jeansImg},

      {id:6,name:"Yellow Designer Kurti",price:800,size:"M",category:"kurti",img:kurtiImg},

      {id:7,name:"Western Style Outfit",price:1400,size:"M",category:"westernwear",img:westernImg},

      {id:8,name:"Cordset Premium",price:1600,size:"M",category:"cordset",img:cordsetImg},
    ];

    const normalizedAdmin = adminProducts.map(p=>({
      ...p,
      category: normalizeCategory(p.category),
      price: Number(p.price)||0
    }));

    setProducts([...staticProducts,...normalizedAdmin]);

  },[]);

  /* LOAD CATEGORY BUTTONS */
  useEffect(()=>{

    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    const formatted = storedCategories.map(c=>({
      label:c,
      value:normalizeCategory(c)
    }));

    setCategories([{label:"All Products",value:"all"},...formatted]);

  },[]);

  /* URL CATEGORY */
  useEffect(()=>{
    const params=new URLSearchParams(location.search);
    setActiveCategory(params.get("category")||"all");
  },[location.search]);

  /* CART COUNT */
  useEffect(()=>{
    const cart=JSON.parse(localStorage.getItem("cart"))||[];
    setCartCount(cart.length);
  },[]);

  /* ADD TO CART */
  const addToCart=(product)=>{

    const cart=JSON.parse(localStorage.getItem("cart"))||[];

    cart.push({
      id: Date.now()+Math.random(),
      name: product.name,
      price: Number(product.price)||0,
      size: product.size||"M",
      category: product.category,
      img: product.img,
      quantity:1
    });

    localStorage.setItem("cart",JSON.stringify(cart));
    setCartCount(cart.length);
  };

  const filteredProducts =
    activeCategory==="all"
      ? products
      : products.filter(
          p=>normalizeCategory(p.category)===activeCategory
        );

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

          <div onClick={()=>navigate("/cart")} style={{position:"relative",cursor:"pointer"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" width="22"/>
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
              }}>{cartCount}</span>
            )}
          </div>

          <button onClick={handleLogout}
            style={{border:"1px solid #007bff",background:"transparent",padding:"6px 14px"}}>
            LogOut
          </button>

        </div>
      </div>

      {/* CATEGORY */}
      <div style={{padding:"30px"}}>
        <h1>Shop Collection</h1>

        <div style={{display:"flex",gap:"15px",marginTop:"20px"}}>
          {categories.map(cat=>(
            <button key={cat.value}
              onClick={()=>setActiveCategory(cat.value)}
              style={{
                padding:"10px 20px",
                borderRadius:"20px",
                border:"none",
                background:activeCategory===cat.value?"#ff2e8a":"#e6d3de",
                color:activeCategory===cat.value?"#fff":"#000",
                cursor:"pointer"
              }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
        gap:"20px",
        padding:"20px 40px"
      }}>

        {filteredProducts.map(item=>(
          <div key={item.id}
            style={{
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
                  borderRadius:"5px",
                  cursor:"pointer"
                }}>
                Buy Now
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}