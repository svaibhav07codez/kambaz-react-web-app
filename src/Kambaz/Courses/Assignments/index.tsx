import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentControls from "./AssignmentControls";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import * as db from "../../Database";
import { courses } from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  const course = courses.find((course) => course._id === cid);

  // Return a fallback if the course isn't found
  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div id="wd-assignments" className="ms-5">
      <AssignmentControls />
      <br />
      <br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-0.5 fs-3" />
            <IoMdArrowDropdown className="fs-4" /> <b>ASSIGNMENTS</b>
            <IoEllipsisVertical className="fs-4 float-end mt-1" />
            <AiOutlinePlus className="float-end fs-5 mt-1 me-4" />
            <span className="float-end rounded-5 me-2 border p-1">
              40% of Total
            </span>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start"
                >
                  <BsGripVertical className="fs-3 mt-4" />
                  <FaRegPenToSquare className="fs-3 mt-4 text-success" />
                  <div>
                    <Link
                      to={`/Kambaz/Courses/${course._id}/Assignments/${assignment._id}`}
                      className="wd-assignment-link"
                    >
                      {assignment.title}
                    </Link>
                    <br />
                    <span className="wd-assignment-subtext">
                      | <b>Not available until</b> May 13 at 12:00am | <br />
                      <b>Due</b> May 20 at 11:59pm | 100 pts
                    </span>
                  </div>
                  <AssignmentControlButtons />
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
