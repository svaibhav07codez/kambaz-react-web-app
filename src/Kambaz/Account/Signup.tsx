import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="container"
      style={{ maxWidth: "400px" }}
    >
      <h3>Sign up</h3>
      <Form>
        <Form.Group controlId="wd-username" className="mb-2">
          <Form.Control placeholder="username" />
        </Form.Group>

        <Form.Group controlId="wd-password" className="mb-2">
          <Form.Control placeholder="password" type="password" />
        </Form.Group>

        <Form.Group controlId="wd-password-verify" className="mb-3">
          <Form.Control placeholder="verify password" type="password" />
        </Form.Group>

        <Link
          to="/Kambaz/Account/Profile"
          className="btn btn-primary w-100 mb-2"
        >
          Signup
        </Link>
        <Link to="/Kambaz/Account/Signin">Sign in</Link>
      </Form>
    </div>
  );
}
