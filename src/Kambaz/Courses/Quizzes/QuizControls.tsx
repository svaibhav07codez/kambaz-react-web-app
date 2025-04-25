// import { useState } from "react";
// import { Button, Modal, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function QuizControls({
  addQuizHandler,
}: {
  addQuizHandler: () => void;
}) {
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  return (
    <>
      <Button
        variant="danger"
        size="lg"
        className="float-end me-2"
        onClick={addQuizHandler}
      >
        + Quiz
      </Button>
    </>
  );
}
