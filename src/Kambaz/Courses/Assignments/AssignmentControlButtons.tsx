import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AssignmentControlButtons({
  assignmentID,
  deleteAssignment,
}: {
  assignmentID: String;
  deleteAssignment: (assignmentID: String) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteAssignment(assignmentID);
    setShowDeleteModal(false);
  };

  return (
    <div id="wd-assignment-control-buttons" className="float-end mt-4 ms-2">
      {isFaculty && (
        <FaTrash
          className="text-danger mt-1 me-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowDeleteModal(true)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">
                  Are you sure you want to delete?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Proceed{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
