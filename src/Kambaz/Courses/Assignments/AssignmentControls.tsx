import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

interface AssignmentControlsProps {
  onAddAssignment: () => void;
}

export default function AssignmentControls({
  onAddAssignment,
}: AssignmentControlsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div
      id="wd-assignment-controls"
      className="d-flex justify-content-between align-items-center mt-4"
    >
      <div
        id="wd-assignment-control-search"
        className="input-group flex-grow-1 me-3"
        style={{ maxWidth: "350px" }}
      >
        <span className="input-group-text bg-white border-end-0">
          <CiSearch />
        </span>
        <input
          type="search"
          placeholder="Search..."
          className="form-control border-start-0"
          style={{ paddingLeft: "5px" }}
        />
      </div>

      {currentUser?.role === "FACULTY" && (
        <div
          className="d-flex justify-content-end"
          style={{ whiteSpace: "nowrap", gap: "10px" }}
        >
          <button id="wd-add-module-btn" className="btn btn-outline-secondary">
            <FaPlus className="me-1" style={{ bottom: "1px" }} />
            Group
          </button>
          <button
            id="wd-add-assignment-btn"
            className="btn btn-danger"
            onClick={onAddAssignment}
          >
            <FaPlus className="me-1" style={{ bottom: "1px" }} />
            Assignment
          </button>
        </div>
      )}
    </div>
  );
}
