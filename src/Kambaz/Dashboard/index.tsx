import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/pdp.png" width={200} />
            <div>
              <h5> CS 5010 Program Design Paradigm </h5>
              <p className="wd-dashboard-course-title"> Software Developer </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/recitation.png" width={200} />
            <div>
              <h5> CS 5011 Recitation for Program Design Paradigm </h5>
              <p className="wd-dashboard-course-title">
                Lab </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/fai.png" width={200} />
            <div>
              <h5> CS 5100 Foundations of AI </h5>
              <p className="wd-dashboard-course-title"> AI developer </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/webdev.png" width={200} />
            <div>
              <h5> CS 5610 </h5>
              <p className="wd-dashboard-course-title"> Web Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/algo.png" width={200} />
            <div>
              <h5> CS 5800 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Algorithms Specialist  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/cdc.png" width={200} />
            <div>
              <h5> Career Design Course </h5>
              <p className="wd-dashboard-course-title">
                Prepare your course  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/coop.png" width={200} />
            <div>
              <h5> Fall24 - Career Preparation & Coop </h5>
              <p className="wd-dashboard-course-title">
                Requirement for coop approval </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
);}
