import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; // 🔁 use this to call backend

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials); // 🔥 send to server
      if (!user || !user._id) {
        alert("Incorrect username or password.");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (err) {
      console.error("Sign in failed:", err);
      alert("Error signing in.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
      />
      <input
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
