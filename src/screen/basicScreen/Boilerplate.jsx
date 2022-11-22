import { Outlet } from "react-router-dom";

// components
// import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Boilerplate() {
  return (
    <section className="boilerplate">
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </section>
  );
}
