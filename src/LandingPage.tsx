import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <div className="bg-dark text-white p-4 rounded mb-4">
        <h1 className="fw-bold fs-1">CS5610 - Web Development</h1>
        <h3 className="fs-3">Section 01</h3>
        <h4 className="mt-3">
          <span className="text-warning fw-semibold fs-4">Project:</span>{" "}
          <span className="fs-4">Kambaz Quizzes</span>
        </h4>
      </div>

      <div className="bg-white border rounded p-3 mb-4">
        <h4 className="text-primary text-start fs-4">Teammates</h4>
        <ul className="list-group list-group-flush text-start fs-5">
          <li className="list-group-item">Vaibhav Sankaran</li>
          <li className="list-group-item">Siddharth Ramachandran</li>
          <li className="list-group-item">Mahadharsan Ravichandran</li>
          <li className="list-group-item">Bupesh Kumar Ramesh Kumar</li>
        </ul>
      </div>

      <div className="bg-dark text-white p-3 rounded d-flex flex-wrap justify-content-center gap-2">
        <Button
          variant="outline-light"
          className="fs-6 px-4"
          onClick={() => navigate("/Kambaz/Account/Signin")}
        >
          Kambaz
        </Button>
        <a
          href="https://github.com/svaibhav07codez/kambaz-react-web-app/tree/project"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-light fs-6 px-4"
        >
          React Web App - GitHub
        </a>
        <a
          href="https://github.com/svaibhav07codez/kambaz-node-server-app/tree/project"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-light fs-6 px-4"
        >
          Node Server App - GitHub
        </a>
        <a
          href="https://your-netlify-or-render-link"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-light fs-6 px-4"
        >
          Netlify
        </a>
      </div>
    </div>
  );
}
