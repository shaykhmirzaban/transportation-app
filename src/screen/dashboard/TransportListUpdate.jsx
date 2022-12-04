import React, { useState } from "react";
import SMLabel from "../../components/SMLabel";
import SMLabe1 from "../../components/SMLabe1";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SMInputField from "../../components/SMInputField";
import SMButton from "../../components/SMButton";

// style
import "../../style/ceateTransport.scss";
import { useEffect } from "react";
import { updateItem } from "../../config/FirebaseMethods";

const TransportListUpdate = () => {
  let [data, setData] = useState({
    perSeatRate: "",
    startingPath: "",
    endingPath: "",
    startingTime: "",
    endingTime: "",
    totalSeat: "",
    transportDetail: "",
    transportName: "",
    days: {
      friday: "",
      monday: "",
      saturday: "",
      sunday: "",
      thursday: "",
      tuesday: "",
      wednesday: "",
    },
  });

  let [label, setLabel] = useState("");
  let [label1, setLabel1] = useState("");
  let [flag, setFlag] = useState(false);

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
    setData(location.state);
  }, []);

  const currentV = (e) => {
    let { value, name } = e.target;

    setData((val) => {
      return {
        ...val,
        [name]: value,
      };
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

  const updateDataFn = (e) => {
    e.preventDefault();
    setFlag(true);

    updateItem(data, `createCategory/${id}`, data.key)
      .then((_) => {
        console.log(_);
        setLabel("Successfully Update");
        setFlag(false);
        navigate(`/dashboard/${id}/transport-list`);
      })
      .catch((_) => {
        setLabel1("Something went wrong");
        setFlag(false);
      });
  };

  return (
    <section className="transportListUpdate">
      <div className="heading">
        <h1>Update Item</h1>
      </div>

      <form onSubmit={updateDataFn}>
        <label htmlFor="">Transport Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. school vans etc."
          name="transportName"
          value={data.transportName}
          fnName={currentV}
        />

        <label htmlFor="">Transport Detail: </label>
        <textarea
          name="transportDetail"
          placeholder="describe short detail about your service."
          cols="30"
          rows="10"
          value={data.transportDetail}
          onChange={currentV}
        ></textarea>

        <label htmlFor="">Total Seat: </label>
        <SMInputField
          type="number"
          placeholder="i.e. 2, 4, 5, etc."
          name="totalSeat"
          value={data.totalSeat}
          fnName={currentV}
        />

        <label htmlFor="">Per Seat Rate: </label>
        <SMInputField
          type="number"
          placeholder="i.e. 250, 150, etc."
          name="perSeatRate"
          value={data.perSeatRate}
          fnName={currentV}
        />

        <label htmlFor="">Starting Route Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. Korangi, Orangi, etc."
          name="startingPath"
          value={data.startingPath}
          fnName={currentV}
        />

        <label htmlFor="">Ending Route Name: </label>
        <SMInputField
          type="text"
          placeholder="i.e. Korangi, Orangi, etc."
          name="endingPath"
          value={data.endingPath}
          fnName={currentV}
        />

        <label htmlFor="">Starting Time: </label>
        <SMInputField
          type="time"
          name="startingTime"
          //   value={data.startingTime.slice(0, 5)}
          fnName={onTimeChange}
        />

        <label htmlFor="">Ending Time: </label>
        <SMInputField
          type="time"
          name="endingTime"
          //   value={
          //     Number(data.endingTime.slice(0, 1)) < 10
          //       ? `0${data.endingTime.slice(0, data.endingTime.length - 3)}`
          //       : data.endingTime.slice(0, 5)
          //   }
          fnName={onTimeChange1}
        />

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
                checked={data.days.saturday == true && data.days.saturday}
                fnName={checkedDay}
              />
            </div>

            <div className="sunday">
              <label htmlFor="sunday">Sunday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="sunday"
                checked={data.days.sunday == true && data.days.sunday}
                fnName={checkedDay}
              />
            </div>

            <div className="monday">
              <label htmlFor="monday">Monday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="monday"
                checked={data.days.monday == true && data.days.monday}
                fnName={checkedDay}
              />
            </div>

            <div className="tuesday">
              <label htmlFor="tuesday">Tuesday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="tuesday"
                checked={data.days.tuesday == true && data.days.tuesday}
                fnName={checkedDay}
              />
            </div>

            <div className="wednesday">
              <label htmlFor="wednesday">Wednesday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="wednesday"
                checked={data.days.wednesday == true && data.days.wednesday}
                fnName={checkedDay}
              />
            </div>

            <div className="thursday">
              <label htmlFor="thursday">Thursday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="thursday"
                checked={data.days.thursday == true && data.days.thursday}
                fnName={checkedDay}
              />
            </div>

            <div className="friday">
              <label htmlFor="friday">Friday</label>
              <SMInputField
                type="checkbox"
                name="day"
                id="friday"
                checked={data.days.friday == true && data.days.friday}
                fnName={checkedDay}
              />
            </div>
          </div>
        </div>

        <SMButton value="Submit" isLoading={flag} />
      </form>

      {label && <SMLabel name={label} />}
      {label1 && <SMLabe1 name={label1} />}
    </section>
  );
};

export default TransportListUpdate;
