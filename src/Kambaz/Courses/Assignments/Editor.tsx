import { Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const { aid, cid } = useParams();

  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  let currentAssignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );
  const [assignment, setAssignment] = useState<any>(currentAssignment);

  const assignmentName = assignment?.name || "";
  const description = assignment?.description || "";
  const points = assignment?.points || 0;
  const dueDate = assignment?.due_date || "";
  const availableDate = assignment?.start_date || "";
  const untilDate = assignment?.until_date || "";

  const createAssignmentForCourse = async (assignment: any) => {
    if (!cid) return;
    const newAssignment = await coursesClient.createAssignmentForCourse(
      cid,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  return (
    <div id="wd-assignments-editor">
      <h3>{aid ? "Edit Assignment" : "Add New Assignment"}</h3>
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignmentName}
            onChange={(e) =>
              setAssignment((prev: any) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter assignment name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            cols={50}
            value={description}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Enter assignment description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                points: e.target.value,
              }))
            }
            placeholder="Enter points"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-due">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                due_date: e.target.value,
              }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-available">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            value={availableDate}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                start_date: e.target.value,
              }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-available">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            value={untilDate}
            onChange={(e) =>
              setAssignment((prev: any) => ({
                ...prev,
                until_date: e.target.value,
              }))
            }
          />
        </Form.Group>

        <Link
          to={`/Kambaz/Courses/${cid}/Assignments`}
          className="wd-assignment-link d-block"
        >
          <Button className="float-end" variant="secondary">
            Cancel
          </Button>
        </Link>

        <Link
          to={`/Kambaz/Courses/${cid}/Assignments`}
          className="wd-assignment-link d-block"
        >
          <Button
            className="me-1 float-end"
            variant="danger"
            onClick={() => {
              if (currentAssignment) {
                saveAssignment(assignment);
              } else {
                createAssignmentForCourse(assignment);
              }
            }}
          >
            Save
          </Button>
        </Link>
      </Form>
    </div>
  );
}
