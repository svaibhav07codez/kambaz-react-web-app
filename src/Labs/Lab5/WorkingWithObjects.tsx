import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "React Basics",
    description: "Introduction to React",
    course: "Web Dev",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Assignment</h4>
      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Assignment Title</h4>
      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      <hr />

      <h4>Modify Assignment Title</h4>
      <FormControl
        className="w-75 mb-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        className="btn btn-success mb-3"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <hr />

      <h4>Update Score</h4>
      <FormControl
        className="w-25 mb-2"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        className="btn btn-warning mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <hr />

      <h4>Update Completed</h4>
      <label className="form-check-label me-2">
        Completed:
        <input
          type="checkbox"
          className="form-check-input ms-2"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
      </label>
      <a
        className="btn btn-warning ms-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <hr />

      <h4>Module Object</h4>
      <a className="btn btn-primary mb-2" href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <br />
      <a className="btn btn-primary mb-3" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <h5>Update Module Name</h5>
      <FormControl
        className="w-75 mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        className="btn btn-success mb-3"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>

      <h5>Update Module Description</h5>
      <FormControl
        className="w-75 mb-2"
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        className="btn btn-success"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
    </div>
  );
}
