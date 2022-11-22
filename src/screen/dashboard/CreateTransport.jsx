import { useState } from "react";
import SMButton from "../../components/SMButton";
import SMInputField from "../../components/SMInputField";
import { addItem, uploadImage } from "../../config/FirebaseMethods";
import SMLabel from "../../components/SMLabel";
import SMLabe1 from "../../components/SMLabe1";

// style
import "../../style/ceateTransport.scss";

export default function CreateTransport() {
  let [currentImage, setCurrentImage] = useState("");
  let [data, setData] = useState({
    transportName: "",
    transportDetail: "",
    perSeatRate: "",
    totalSeat: "",
    startingPath: "",
    endingPath: "",
    startingTime: "",
    endingTime: "",
    days: {
      saturday: "false",
      sunday: "false",
      monday: "false",
      tuesday: "false",
      wednesday: "false",
      thursday: "false",
      friday: "false",
    },
  });
  let [flag, setFlag] = useState(false);
  let [label, setLabel] = useState("");
  let [label1, setLabel1] = useState("");

  const currentV = (e) => {
    let { value, name } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const checkedDay = (e) => {
    let { id, checked } = e.target;
    setData((val) => {
      return {
        ...val,
        days: {
          ...val.days,
          [id]: checked,
        },
      };
    });
  };

  function onTimeChange(e) {
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
    setData((val) => {
      return { ...val, startingTime: timeFormate };
    });
  }

  function onTimeChange1(e) {
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
    setData((val) => {
      return { ...val, endingTime: timeFormate };
    });
  }

  // addItem(data, "createCategory")
  //   .then((_) => {
  //     console.log(_);
  //   })
  //   .catch((_) => {
  //     console.log(_);
  //   });

  const submitDataFn = (e) => {
    e.preventDefault();
    setFlag(true);

    uploadImage(currentImage, "images", data, "createCategory")
      .then((_) => {
        alert("Successfully Added");
        setFlag(false);
        setLabel("successfully create");
      })
      .catch((_) => {
        console.log(_);
        setFlag(false);
        setLabel1("Something went wrong");
      });
  };

  return (
    <section className="createTransport">
      <div className="heading">
        <h1>Create Transport</h1>
      </div>

      <form onSubmit={submitDataFn}>
        <label htmlFor="">Transport Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. school vans etc."
          name="transportName"
          fnName={currentV}
        />

        <label htmlFor="">Transport Detail: </label>
        <textarea
          name="transportDetail"
          placeholder="describe short detail about your service."
          cols="30"
          rows="10"
          onChange={currentV}
        ></textarea>

        <label htmlFor="">Total Seat: </label>
        <SMInputField
          type="number"
          placeholder="i.e. 2, 4, 5, etc."
          name="totalSeat"
          fnName={currentV}
        />

        <label htmlFor="">Per Seat Rate: </label>
        <SMInputField
          type="number"
          placeholder="i.e. 250, 150, etc."
          name="perSeatRate"
          fnName={currentV}
        />

        <label htmlFor="">Starting Route Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. Korangi, Orangi, etc."
          name="startingPath"
          fnName={currentV}
        />

        <label htmlFor="">Ending Route Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. Korangi, Orangi, etc."
          name="endingPath"
          fnName={currentV}
        />

        <label htmlFor="">Starting Time: </label>
        <SMInputField type="time" name="startingTime" fnName={onTimeChange} />

        <label htmlFor="">Ending Time: </label>
        <SMInputField type="time" name="endingTime" fnName={onTimeChange1} />

        <div className="days">
          <div className="description">
            <h4>Select Day</h4>
            <p>
              Select the correct days on which you will provide your customer
              services.
            </p>
          </div>

          <div className="day">
            <div className="saturday">
              <label htmlFor="saturday">Saturday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="saturday"
                fnName={checkedDay}
              />
            </div>

            <div className="sunday">
              <label htmlFor="sunday">Sunday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="sunday"
                fnName={checkedDay}
              />
            </div>

            <div className="monday">
              <label htmlFor="monday">Monday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="monday"
                fnName={checkedDay}
              />
            </div>

            <div className="tuesday">
              <label htmlFor="tuesday">Tuesday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="tuesday"
                fnName={checkedDay}
              />
            </div>

            <div className="wednesday">
              <label htmlFor="wednesday">Wednesday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="wednesday"
                fnName={checkedDay}
              />
            </div>

            <div className="thursday">
              <label htmlFor="thursday">Thursday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="thursday"
                fnName={checkedDay}
              />
            </div>

            <div className="friday">
              <label htmlFor="friday">Friday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="friday"
                fnName={checkedDay}
              />
            </div>
          </div>
        </div>

        <div className="uploadImage">
          <div className="heading">
            <h1>upload Image</h1>
            <p>
              please upload a clear image that tells the condition of your
              service so the customer easily sees your service and selects you.
            </p>
          </div>

          <SMInputField
            type="file"
            fnName={(e) => setCurrentImage(e.target.files[0])}
          />
        </div>

        <SMButton value="Submit" isLoading={flag} />
      </form>

      {label && <SMLabel name={label} />}
      {label1 && <SMLabe1 name={label1} />}
    </section>
  );
}
