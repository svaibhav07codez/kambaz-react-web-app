import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", 
        completed: false, 
        score: 0,
    });

      const [module, setModule] = useState({
        id: "M101",
        name: "React Basics",
        description: "Introduction to React and components",
        course: "Web Dev",
      });

      const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
      const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

      return (
        <div id="wd-working-with-objects">
        <h3>Working With Objects</h3>

        <h4>Modifying Assignment</h4>
        <FormControl
        className="w-75"
        defaultValue={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <a
        className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <br />

      <FormControl
        type="number"
        className="w-75 mt-2"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        className="btn btn-success mt-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <br />
        <br />

        <label className="mt-2">
            <input
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked })
            }
            />
            {" "}Completed
        </label>
        <br />
        <a
            className="btn btn-warning mt-2"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
            Update Completed
        </a>

        <h4>Retrieving Objects</h4>
        <a id="wd-retrieve-assignments" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment`}>
            Get Assignment
        </a><hr/>
        <h4>Retrieving Properties</h4>
        <a id="wd-retrieve-assignment-title" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/title`}>
            Get Title
        </a><hr/>
        

        {/* ----- Module Section ----- */}
      <hr />
      <h4>Retrieving Module</h4>
      <a className="btn btn-info" href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <br />
      <a className="btn btn-info mt-2" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <hr />
      <h4>Modifying Module</h4>
      <FormControl
        className="w-75"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        className="btn btn-secondary mt-2"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <br />

      <FormControl
        className="w-75 mt-2"
        defaultValue={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <a
        className="btn btn-dark mt-2"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
    </div>
    );
}
