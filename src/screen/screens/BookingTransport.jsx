import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem, user_is_signin } from "../../config/FirebaseMethods";

// component
import SMLoading from "../../components/SMLoading";
import SMLabel from "../../components/SMLabel";
import SMLabel1 from "../../components/SMLabe1";
// style
import "../../style/courseDetail.scss";

export default function BookingTransport() {
  let [data, setData] = useState([]);
  let [item, setItem] = useState({
    name: "",
    phone: "",
    startingPath: "",
    endingPath: "",
    time: "",
    day: "",
    selectedSeat: "",
  });
  let [isLoding, setIsLoding] = useState(false);
  let [label, setLabel] = useState("");
  let [label1, setLabel1] = useState("");

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    user_is_signin()
      .then((_) => {
        setData(location.state);
      })
      .catch((_) => {
        navigate("/login");
        alert("before Booking you need to login");
      });
  }, []);

  const currentV = (e) => {
    let { value, name } = e.target;
    setItem((val) => {
      return { ...val, [name]: value };
    });
  };

  const timeFn = (e) => {
    var timeSplit = e.target.value.split(":"),
      meridian,
      hours,
      minutes;

    hours = timeSplit[0];
    minutes = timeSplit[1];

    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }

    let timeFormate = `${hours}:${minutes}:${meridian}`;
    setItem((val) => {
      return { ...val, time: timeFormate };
    });
  };

  const submitDetailFn = (e) => {
    e.preventDefault();

    item.totalPrice = Number(item.selectedSeat) * Number(data.perSeatRate);
    item.date = new Date().toLocaleDateString();
    setIsLoding(true);

    addItem(item, `Booking/${data.id}`)
      .then((_) => {
        setLabel("Successfully Added");
        console.log(_);
        setIsLoding(false);
      })
      .catch((_) => {
        setLabel1("something went wrong");
        console.log(_);
        setIsLoding(false);
      });
  };

  return (
    <section className="courseDetail">
      {data && (
        <div className="detail">
          <div className="courseDescription">
            <div className="course-detail">
              <h1 style={{ textTransform: "capitalize" }}>
                {data.transportName}
              </h1>
              <p>{data.transportDetail}</p>
            </div>

            <div className="courseDuration">
              <h4>
                Starting Path:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.startingPath}
                </span>
              </h4>
              <h4>
                Ending Path:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.endingPath}
                </span>
              </h4>
            </div>

            <div className="noOfQuiz">
              <h4>
                Starting Time:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.startingTime}
                </span>
              </h4>
              <h4>
                Ending Time:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.endingTime}
                </span>
              </h4>
            </div>

            <div className="leadTrainer">
              <h4>
                Total Seat:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.totalSeat}
                </span>
              </h4>
              <h4>
                Per Seat Rate:{" "}
                <span style={{ color: "rgb(246 119 98)" }}>
                  {data.perSeatRate}
                </span>
              </h4>
            </div>

            <div className="assistantTrainer">
              <h4 style={{ fontWeight: "bold", color: "#333" }}>Days</h4>
              <ul>
                {data.days &&
                  Object.values(data.days).map((value, index) => (
                    <li key={index} style={{ padding: "10px 0" }}>
                      <span style={{ textTransform: "capitalize" }}>
                        {Object.keys(data.days)[index]}:{" "}
                      </span>
                      {value == false || value == "false" ? (
                        <span
                          style={{
                            backgroundColor: "red",
                            color: "#fff",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          close
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "green",
                            color: "#fff",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          open
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="courseImage">
            <img src={data.image} alt="image not found" />
          </div>
        </div>
      )}

      <div className="courseForm">
        <div className="heading">
          <h1>Booking Form</h1>
        </div>

        <form onSubmit={submitDetailFn}>
          <div className="name">
            <label>Your Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={currentV}
            />
          </div>

          <div className="phoneNo">
            <label>Phone no:</label>
            <input
              type="number"
              placeholder="Enter phone no"
              name="phone"
              onChange={currentV}
            />
          </div>

          <div className="startingPath">
            <label>Starting Path:</label>
            <input
              type="text"
              placeholder="Starting Path"
              name="startingPath"
              onChange={currentV}
            />
          </div>

          <div className="endingPath">
            <label>Ending Path:</label>
            <input
              type="text"
              placeholder="Ending Path"
              name="endingPath"
              onChange={currentV}
            />
          </div>

          <div className="time">
            <label>Time:</label>
            <input
              type="time"
              placeholder="Time"
              name="time"
              onChange={timeFn}
            />
          </div>

          <div className="day">
            <label>Day:</label>
            <select name="day" onChange={currentV}>
              {data &&
                data.days &&
                Object.values(data.days).map((value, index) => {
                  if (value == "true" || value == true) {
                    let name = Object.keys(data.days)[index];
                    return (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    );
                  }
                })}
            </select>
          </div>

          <div className="selectSeat">
            <label>Select Seat:</label>
            {/* <select name="selectedSeat" onChange={currentV}>
            {totalSeat.map((value, index) => {
              return (
                <option value={value} key={index}>
                  {value}
                </option>
              );
            })}
          </select> */}
            <input type="number" name="selectedSeat" onChange={currentV} />
          </div>

          <div className="button">
            <button>{isLoding ? <SMLoading /> : "Submit"}</button>
          </div>
        </form>
      </div>

      {label && <SMLabel name={label} />}
      {label1 && <SMLabel1 name={label1} />}
    </section>
  );
}
