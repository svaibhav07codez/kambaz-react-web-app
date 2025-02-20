import { IoCloseOutline } from "react-icons/io5";
import { Link, useParams } from "react-router";
import * as db from "../../Database";

export default function Editor() {
  // Extract course ID and assignment ID from URL
  const { cid, aid } = useParams();

  // Find the matching assignment in your database
  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  // If no matching assignment is found, show a fallback
  if (!assignment) {
    return <div>Assignment not found.</div>;
  }

  // In a real app, you might store these in local state for editing, e.g.:
  // const [title, setTitle] = useState(assignment.title);
  // But for now, we’ll just display them directly from the assignment object.

  return (
    <div id="wd-assignments-editor" className="ms-5 mt-3">
      <div className="row mb-3">
        <div className="col-sm-12">
          <label htmlFor="wd-name">
            <b>Assignment Name</b>
          </label>
          <input
            id="wd-name"
            className="form-control mt-2"
            value={assignment.title}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div
            id="wd-description-container"
            className="wd-assignment-editor-desc-container"
          >
            <textarea
              id="wd-description"
              className="form-control mt-2"
              cols={50}
              rows={15}
              // Fallback if description is not in your DB
              value={assignment.description || ""}
              onChange={() => {}}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-5">
          <label htmlFor="wd-points" className="col-form-label float-end">
            Points
          </label>
        </div>
        <div className="col-sm-7">
          <input
            id="wd-points"
            className="form-control"
            placeholder="100"
            // Fallback if points is not in your DB
            value={assignment.points ?? ""}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-5">
          <label htmlFor="wd-group" className="col-form-label float-end">
            Assignment Group
          </label>
        </div>
        <div className="col-sm-7">
          <select id="wd-group" className="form-select">
            <option value="VAL1" selected>
              Assignments
            </option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-5">
          <label
            htmlFor="wd-display-grade-as"
            className="col-form-label float-end"
          >
            Display Grade as
          </label>
        </div>
        <div className="col-sm-7">
          <select id="wd-display-grade-as" className="form-select">
            <option value="VAL1" selected>
              Percentage
            </option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-5">
          <label
            htmlFor="wd-submission-type"
            className="col-form-label float-end"
          >
            Submission Type
          </label>
        </div>
        <div className="col-md-7">
          <fieldset className="border p-2">
            <div>
              <select id="wd-submission-type" className="form-select">
                <option value="VAL1" selected>
                  Online
                </option>
              </select>
            </div>
            <div className="mt-4">
              <span>
                <b>Online Entry Options</b>
              </span>
              <br />
              <br />
              <input id="wd-text-entry" type="checkbox" />
              <label htmlFor="wd-text-entry" className="ms-1">
                Text Entry
              </label>
              <br />
              <br />
              <input id="wd-website-url" type="checkbox" />
              <label htmlFor="wd-website-url" className="ms-1">
                Website URL
              </label>
              <br />
              <br />
              <input id="wd-media-recordings" type="checkbox" />
              <label htmlFor="wd-media-recordings" className="ms-1">
                Media Recordings
              </label>
              <br />
              <br />
              <input id="wd-student-annotation" type="checkbox" />
              <label htmlFor="wd-student-annotation" className="ms-1">
                Student Annotation
              </label>
              <br />
              <br />
              <input id="wd-file-upload" type="checkbox" />
              <label htmlFor="wd-file-upload" className="ms-1">
                File Uploads
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-5">
          <label htmlFor="wd-assign-to" className="col-form-label float-end">
            Assign
          </label>
        </div>
        <div className="col-sm-7">
          <fieldset className="border p-2">
            <div className="wd-assign-to-input-wrapper">
              <div className="wd-assign-to-input-content">
                Everyone <IoCloseOutline />
              </div>
              <label htmlFor="wd-assign-to" className="col-form-label">
                <b>Assign to</b>
              </label>
              <input id="wd-assign-to" className="form-control" placeholder="" />
            </div>
            <label htmlFor="wd-due-date" className="col-form-label">
              Due
            </label>
            <input
              id="wd-due-date"
              className="form-control"
              type="date"
              value={assignment.dueDate || ""}
              onChange={() => {}}
            />
            <div className="d-flex">
              <div className="me-2">
                <label htmlFor="wd-available-from" className="col-form-label">
                  <b>Available from</b>
                </label>
                <input
                  id="wd-available-from"
                  className="form-control"
                  type="date"
                  style={{ width: "110px" }}
                  value={assignment.availableFrom || ""}
                  onChange={() => {}}
                />
              </div>
              <div className="float-end">
                <label htmlFor="wd-available-until" className="col-form-label">
                  <b>Until</b>
                </label>
                <input
                  id="wd-available-until"
                  className="form-control"
                  type="date"
                  style={{ width: "110px" }}
                  value={assignment.availableUntil || ""}
                  onChange={() => {}}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <hr />

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          {/* 
            Clicking Cancel or Save should return to:
            /Kambaz/Courses/<cid>/Assignments 
          */}
          <Link
            id="wd-cancel"
            className="btn btn-secondary me-1"
            to={`/Kambaz/Courses/${cid}/Assignments`}
          >
            Cancel
          </Link>
          <Link
            id="wd-save"
            className="btn btn-primary btn-danger"
            to={`/Kambaz/Courses/${cid}/Assignments`}
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}
