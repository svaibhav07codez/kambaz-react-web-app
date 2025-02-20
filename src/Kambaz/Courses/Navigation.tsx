import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";
import { ListGroup } from "react-bootstrap";

export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <ListGroup.Item key={link} as={Link} to={`/Kambaz/Courses/${course?._id}/${link}`} className={`list-group-item active border border-0
          ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item active border border-0"}`}> {link}
        </ListGroup.Item>
      ))}
     </div>
    );
  } 
