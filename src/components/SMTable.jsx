import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../config/FirebaseMethods";

// style
import "../style/dashboard/SMTable.scss";

export default function SMTable() {
  let [data, setData] = useState([
    {
      courseName: "asd",
      leadTrainer: "Shaykh Mirzaban",
      assistantTrainer: ["Mirzaban", "Sameer", "Mirza"],
      courseDuration: "2",
      noOfQuiz: "2",
      price: "213",
      isPubliclyOpen: "yes",
    },
  ]);
  let navigate = useNavigate();

  const deleteCourse = (getValue, inx) => {
    deleteItem("course", getValue.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, index) => index !== inx));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="SMTable">
      <div className="courseList">
        <div className="tableBasic">
          <div className="heading">
            <h1>Basic Info</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Lead Trainer</th>
                <th>Assistant Trainer</th>
                <th>Course Duration</th>
                <th>No. of Quiz</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.courseName}</td>
                      <td>{value.leadTrainer}</td>
                      <td>
                        {value.assistantTrainer &&
                          value.assistantTrainer.map((value, index) => (
                            <li key={index}>{value}</li>
                          ))}
                      </td>
                      <td>{value.courseDuration} Month</td>
                      <td>{value.noOfQuiz} Quiz</td>
                      <td>Rs {value.price}</td>
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
                <th>Is Publicly Open</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.isPubliclyOpen}</td>
                      <td>
                        <button onClick={() => deleteCourse(value, index)}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate("course-update", { state: value })
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
    </section>
  );
}
