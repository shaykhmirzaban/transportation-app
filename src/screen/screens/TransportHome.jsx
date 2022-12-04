// component
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SMButton from "../../components/SMButton";
import SMInputField from "../../components/SMInputField";
import { getItem, user_is_signin } from "../../config/FirebaseMethods";

// style
import "../../style/transport.scss";

export default function TransportHome() {
  let [item, setItem] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getItem("createCategory")
      .then((e) => {
        //{[0: {0: {}, 1: {}}]}
        //[0: {0: {}, 1: {}}]
        // [123213: {}, 1231231: {}]
        // [0: {}, 1: {}]
        setItem(Object.values(...Object.values(e)));
      })
      .catch((e) => console.log(e));
  }, []);

  // const bookingFn = () => {

  // };

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
            {item.map((value, index) => {
              return (
                <div className="card1" key={index}>
                  <img src={value.image} alt="Image not found" />

                  <div className="description">
                    <h3 className="name">{value.transportName}</h3>
                    <p>{value.transportDetail}</p>
                    <div className="buttonPart">
                      <SMButton
                        value="Booking Now"
                        fnName={() =>
                          navigate("booking-transport", { state: value })
                        }
                      />
                      <h1>RS {value.perSeatRate}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
