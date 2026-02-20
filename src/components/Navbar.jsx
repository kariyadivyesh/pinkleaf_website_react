export default function Navbar(){

  return(
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"15px 30px",
      background:"#fff",
      borderBottom:"1px solid #eee"
    }}>

      <h2 style={{color:"#ff2e8a"}}>PinkLeaf</h2>

      <div>
        <span style={{marginRight:"20px"}}>Home</span>
        <span style={{marginRight:"20px"}}>Categories</span>
        <span style={{marginRight:"20px"}}>Cart</span>
        <span>Login</span>
      </div>

    </div>
  )
}
