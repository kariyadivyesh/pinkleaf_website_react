export default function ProductCard({ item }) {

  return (
    <div style={{
      border:"1px solid #eee",
      borderRadius:"10px",
      padding:"10px"
    }}>

      <img
        src={item.image}
        style={{width:"100%",borderRadius:"10px"}}
      />

      <h3>{item.name}</h3>
      <p>₹ {item.price}</p>

      <button>Add to Cart</button>

    </div>
  );
}
