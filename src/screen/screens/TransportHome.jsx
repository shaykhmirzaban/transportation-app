// component
import { Navigate } from "react-router-dom";
import SMButton from "../../components/SMButton";
import SMInputField from "../../components/SMInputField";

// style
import "../../style/transport.scss";

export default function TransportHome() {
  return (
    <>
      <div className="transport">
        <div className="heading">
          <h1>Avaliable Transport</h1>
        </div>

        <div className="sortingPart">
          <div className="heading">
            <h4>Sorting</h4>
          </div>
          <form action="">
            <label htmlFor="">Price: </label>
            <SMInputField type="number" placeholder="enter price" />

            <label htmlFor="">Category: </label>
            <select name="" id="">
              <option value="">--Please choose an option--</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="bus">Bus</option>
            </select>

            <label htmlFor="">Time: </label>
            <select name="" id="">
              <option value="">--Please choose an option--</option>
              <option value="car">Night</option>
              <option value="bike">Day</option>
              <option value="bus">Morning</option>
            </select>

            <SMButton value="Sort" style={{ margin: "0 1rem" }} />
          </form>
        </div>

        <div className="allTransport">
          <div className="heading">
            <h1>All Transport</h1>
          </div>
          <div className="card">
            <div className="card1">
              <img src="./images/bg.jpg" alt="Image not found" />

              <div className="description">
                <h3 className="name">Private Transport</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="buttonPart">
                  <SMButton value="Booking Now" fnName={() => Navigate("")} />
                  <h1>RS 20</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
