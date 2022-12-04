import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SMLabel1 from "../../components/SMLabe1";
import SMLabel from "../../components/SMLabel";
import { deleteItem, getItem } from "../../config/FirebaseMethods";

// style
import "../../style/dashboard/SMTable.scss";

export default function TransportList() {
  let [data, setData] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  let [label, setLabel] = useState("");
  let [label1, setLabel1] = useState("");

  useEffect(() => {
    getItem(`createCategory/${id}`)
      .then((_) => {
        setData(Object.values(_));
      })
      .catch((_) => {
        console.log(_);
      });
  }, []);

  const deleteTransport = (e, ind) => {
    deleteItem(`createCategory/${id}`, e.key)
      .then((_) => {
        setLabel("Successfully Delete");
        setData((val) => {
          return val.filter((value, index) => index !== ind);
        });
      })
      .catch((_) => {
        setLabel1(_);
      });
  };

  return (
    <section className="transportList">
      <div className="heading">
        <h1>Transport List</h1>
      </div>

      {data && data.length > 0 ? (
        <div className="courseList">
          <div className="tableBasic">
            <div className="heading">
              <h1>Basic Info</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Transport Name</th>
                  <th>Transport Detail</th>
                  <th>Starting Path</th>
                  <th>Ending Path</th>
                  <th>Starting Time</th>
                  <th>Ending Time</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                        <td>{value.transportName}</td>
                        <td>{value.transportDetail}</td>
                        <td>{value.startingPath}</td>
                        <td>{value.endingPath}</td>
                        <td>{value.startingTime}</td>
                        <td>{value.endingTime}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="tableAdvance">
            <div className="heading">
              <h1>Advance Info</h1>
            </div>

            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Total Seat</th>
                  <th>Per Seat Rate</th>
                  <th>Days</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                        <td>{value.totalSeat}</td>
                        <td>{value.perSeatRate}</td>
                        <td>
                          <ul>
                            <li>
                              Saturday:{" "}
                              {value.days.saturday == "true" ||
                              value.days.saturday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Sunday:{" "}
                              {value.days.sunday == "true" ||
                              value.days.sunday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Monday:{" "}
                              {value.days.monday == "true" ||
                              value.days.monday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Tuesday:{" "}
                              {value.days.tuesday == "true" ||
                              value.days.tuesday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Wednesday:{" "}
                              {value.days.wednesday == "true" ||
                              value.days.wednesday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Thursday:{" "}
                              {value.days.thursday == "true" ||
                              value.days.thursday == true
                                ? "Open"
                                : "Off"}
                            </li>
                            <li>
                              Friday:{" "}
                              {value.days.friday == "true" ||
                              value.days.friday == true
                                ? "Open"
                                : "Off"}
                            </li>
                          </ul>
                        </td>
                        <td>
                          <button onClick={() => deleteTransport(value, index)}>
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate("transport-list-update", {
                                state: value,
                              })
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p style={{ padding: "1rem" }}>Empty</p>
      )}

      {label && <SMLabel name={label} />}
      {label1 && <SMLabel1 name={label1} />}
    </section>
  );
}
