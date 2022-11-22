import { Outlet } from "react-router-dom";

// component
import Navbar from "../../screen/basicScreen/Navbar";

export default function Transport() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
