import { Repeat } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem, user_is_signin } from "../../config/FirebaseMethods";

// style
import "../../style/dashboard/dashboardHome.scss";

export default function DashboardHome() {
  let [flag, setFlag] = useState(false);
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { id } = useParams();

  useEffect(() => {
    user_is_signin()
      .then((_) => {
        if (_.email === "admin@admin.com") {
          setFlag(true);
        } else {
          getItem("users", id)
            .then((_) => {
              setData(_);
            })
            .catch((_) => {
              console.log(_);
            });
        }
      })
      .catch((_) => console.log(_));
  }, []);

  return (
    <section className="dashboardHome">
      {flag ? (
        ""
      ) : (
        <div className="userProfile">
          <div className="profileImage">
            <div className="image">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="name">
              <h3>{data.name}</h3>
            </div>
          </div>
          <div className="shortDetail">
            <h3>Email: {data.email}</h3>
            <h3>
              Password: {data.password && "*".repeat(data.password.length)}
            </h3> 
          </div>
        </div>
      )}
    </section>
  );
}
