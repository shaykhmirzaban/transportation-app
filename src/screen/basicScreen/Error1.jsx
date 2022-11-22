import { useNavigate } from "react-router-dom";

// scss
import "../../style/basic/error1.scss";

export default function Error1() {
  let navigate = useNavigate();

  return (
    <section className="error">
      <h1>Oops!</h1>
      <h4>Error 404-Page Not Found</h4>
      <p>The page you requested could not be found.</p>
      <p>
        We're working on it{" "}
        <span style={{ color: "#6c63ff", fontWeight: "bold" }}>:)</span>
      </p>
      <img
        src="../images/error/error.svg"
        alt="image not found"
        width="300px"
      />

      <button onClick={() => navigate("/dashboard")}>Go To Home</button>
    </section>
  );
}
