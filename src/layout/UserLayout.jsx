import Navbar from "../components/Navbar";

export default function UserLayout({ children }) {

  return (
    <>
      <Navbar />

      <div style={{padding:"20px"}}>
        {children}
      </div>
    </>
  );
}
