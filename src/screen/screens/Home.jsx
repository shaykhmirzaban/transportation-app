// components
import Navbar from "../basicScreen/Navbar";
import SMButton from "../../components/SMButton";

// style
import "../../style/Home.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  const bookingFn = () => {
    navigate("/transport");
  };

  return (
    <section className="home">
      <Navbar />
      <div className="hero">
        <div className="detail">
          <h1>Transportation App</h1>
          <p>
            All types of transport are available. with low-cost booking now.
          </p>
          <p className="dummy">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
            quia! Eaque dolore assumenda similique temporibus officia laborum,
            vero quis ullam, sunt vel sequi recusandae iure magnam consequuntur
            corporis eligendi ea?
          </p>

          <h4>Most Common Transport Use</h4>
          <ul>
            <li>private transports</li>
            <li>School Bus</li>
            <li>Offices Vans</li>
            <li>College Bus</li>
          </ul>

          <SMButton
            value="Booking Now"
            style={{ width: "150px" }}
            fnName={bookingFn}
          />
        </div>
        <div className="image"></div>
      </div>
    </section>
  );
}
