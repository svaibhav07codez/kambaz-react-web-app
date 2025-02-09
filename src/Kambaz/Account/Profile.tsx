import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="container"
      style={{ maxWidth: "400px" }}
    >
      <h3>Profile</h3>
      <Form>
        <Form.Group controlId="wd-username" className="mb-2">
          <Form.Control defaultValue="alice" placeholder="username" />
        </Form.Group>

        <Form.Group controlId="wd-password" className="mb-2">
          <Form.Control
            defaultValue="123"
            placeholder="password"
            type="password"
          />
        </Form.Group>

        <Form.Group controlId="wd-firstname" className="mb-2">
          <Form.Control defaultValue="Alice" placeholder="First Name" />
        </Form.Group>

        <Form.Group controlId="wd-lastname" className="mb-2">
          <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
        </Form.Group>

        <Form.Group controlId="wd-dob" className="mb-2">
          <Form.Control defaultValue="2000-01-01" type="date" />
        </Form.Group>

        <Form.Group controlId="wd-email" className="mb-2">
          <Form.Control defaultValue="alice@wonderland" type="email" />
        </Form.Group>

        <Form.Group controlId="wd-role" className="mb-3">
          <Form.Select defaultValue="FACULTY">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
          Signout
        </Link>
      </Form>
    </div>
  );
}
