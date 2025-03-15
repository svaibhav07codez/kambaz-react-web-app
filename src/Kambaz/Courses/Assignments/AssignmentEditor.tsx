import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useParams } from "react-router";

export default function AssignmentEditor({ show, handleClose, editingAssignment }: { 
  show: boolean; handleClose: () => void; editingAssignment: any | null;
}) {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editingAssignment?.title || "");
  const [description, setDescription] = useState(editingAssignment?.description || "");
  const [points, setPoints] = useState(editingAssignment?.points || 100);
  const [dueDate, setDueDate] = useState(editingAssignment?.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(editingAssignment?.availableFrom || "");
  const [until, setUntil] = useState(editingAssignment?.until || "");

  const handleSave = () => {
    const assignmentData = {
      title,
      description,
      points,
      dueDate,
      availableFrom,
      until,
      course: cid,
    };

    if (editingAssignment) {
      dispatch(updateAssignment({ ...editingAssignment, ...assignmentData }));
    } else {
      dispatch(addAssignment(assignmentData));
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingAssignment ? "Edit Assignment" : "New Assignment"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Assignment Name */}
          <Form.Group className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Assignment"
            />
          </Form.Group>

          {/* Assignment Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="New Assignment Description"
            />
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Form.Group>

          {/* Date Fields */}
          <Form.Group className="mb-3">
            <Form.Label>Assign</Form.Label>
            <Row>
              <Col>
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={until}
                  onChange={(e) => setUntil(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
