import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AssignmentEditor from "./AssignmentEditor";
import { useEffect, useState } from "react";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";
import { useNavigate } from "react-router-dom";
import * as client from "./client"; // <-- ✅ Import the client
import {
  deleteAssignment as deleteAssignmentAction,
  setAssignments,
} from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEditor, setShowEditor] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);

  const handleNavigate = (assignmentId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };

  const handleEditClick = (assignment: any) => {
    setEditingAssignment(assignment);
    setShowEditor(true);
  };

  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setShowEditor(true);
  };

  const deleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignmentAction(assignmentId));
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await client.fetchAssignments(); // <-- or pass course ID if using course filter
      dispatch(setAssignments(data));
    };
    fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments" className="ms-5">
      <AssignmentControls onAddAssignment={handleAddAssignment} />

      <br />
      <br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-0.5 fs-3" />
            <IoMdArrowDropdown className="fs-4" />
            <b>ASSIGNMENTS</b>
            <IoEllipsisVertical className="fs-4 float-end mt-1" />
            <span className="float-end rounded-5 me-2 border p-1">
              40% of Total
            </span>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li
                  className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start"
                  key={assignment._id}
                >
                  <BsGripVertical className="fs-3 mt-4 me-3" />

                  {currentUser?.role === "FACULTY" ? (
                    <FaRegPenToSquare
                      className="fs-3 mt-4 text-success me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditClick(assignment)}
                    />
                  ) : (
                    <FaRegPenToSquare
                      className="fs-3 mt-4 text-success me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleNavigate(assignment._id)}
                    />
                  )}

                  <div className="wd-content-container flex-grow-1 mx-4">
                    <a
                      className="wd-assignment-link wd-disabled-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentUser?.role !== "FACULTY") {
                          handleNavigate(assignment._id);
                        }
                      }}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {assignment.title}
                    </a>

                    <p>
                      <span className="wd-assignment-modules-text">
                        Multiple Modules
                      </span>
                      <span className="wd-assignment-subtext">
                        {" "}
                        | <b>Not available until</b>{" "}
                        {formatDate(assignment.availableAfterDate)} |
                        <br />
                        <b>Due</b> {formatDate(assignment.dueDate)} |{" "}
                        {assignment.points} pts
                      </span>
                    </p>
                  </div>

                  {currentUser?.role === "FACULTY" && (
                    <AssignmentControlButtons
                      assignmentID={assignment._id}
                      deleteAssignment={() => deleteAssignment(assignment._id)}
                    />
                  )}
                </li>
              ))}
          </ul>
        </li>
      </ul>

      {showEditor && (
        <AssignmentEditor
          show={showEditor}
          handleClose={() => setShowEditor(false)}
          editingAssignment={editingAssignment}
        />
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
