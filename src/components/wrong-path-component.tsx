import { Link } from "react-router-dom";
import "../styles/style.css";

const WrongPathComponent = () => {
  return (
    <div className="wrong-path nav-font">
      <h2 style={{ marginTop: "30px" }}>Oops! This page doesn’t exist.</h2>
      <img src="/images/not_found.svg" alt="page not found" />
      <h3 style={{ margin: "50px 0px" }}>
        It looks like you're lost. Why not head back to our tasty homepage?
      </h3>
      <Link to="/" className="normal_link">
        Back to Home
      </Link>
    </div>
  );
};

export default WrongPathComponent;
