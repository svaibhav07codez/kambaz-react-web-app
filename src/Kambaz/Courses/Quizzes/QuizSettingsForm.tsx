import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";

export default function QuizSettingsForm({ quiz, setQuiz, saveQuiz }: any) {
  const navigate = useNavigate();
  const [localQuiz, setLocalQuiz] = useState({ ...quiz });

  const update = (field: string, value: any) => {
    setLocalQuiz({ ...localQuiz, [field]: value });
  };

  const toInputDateTime = (isoString: string | undefined) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  };

  const handleSave = async (publish = false) => {
    const updated = { ...localQuiz, published: publish };
    await saveQuiz(updated);
    setQuiz(updated);
    if (publish) {
      navigate(`/Kambaz/Courses/${quiz.course}/Quizzes`);
    } else {
      navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${quiz.course}/Quizzes`);
  };

  return (
    <Form className="p-3 border rounded bg-light">
      <Form.Group className="mb-3">
        <Form.Label className="form-label fw-bold text-end w-25 align-middle">
          Title
        </Form.Label>
        <Form.Control
          as="input"
          value={localQuiz.title}
          onChange={(e) => update("title", e.target.value)}
          className="form-control"
          placeholder="Untitled Quiz"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Quiz Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={localQuiz.description || ""}
          onChange={(e) => update("description", e.target.value)}
        />
      </Form.Group>

      <Table borderless className="mb-4">
        <tbody>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">Quiz Type</td>
            <td>
              <Form.Select
                className="w-25 align-middle"
                value={localQuiz.quizType || "Graded Quiz"}
                onChange={(e) => update("quizType", e.target.value)}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </Form.Select>
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Assignment Group
            </td>
            <td>
              <Form.Select
                className="w-25 align-middle"
                value={localQuiz.assignmentGroup || "Quizzes"}
                onChange={(e) => update("assignmentGroup", e.target.value)}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </Form.Select>
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Shuffle Answers
            </td>
            <td>
              <Form.Check
                type="switch"
                checked={localQuiz.shuffleAnswers || false}
                onChange={(e) => update("shuffleAnswers", e.target.checked)}
                label={localQuiz.shuffleAnswers ? "Yes" : "No"}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Time Limit (minutes)
            </td>
            <td>
              <Form.Control
                className="w-25 align-middle"
                type="number"
                value={localQuiz.timeLimit || 20}
                onChange={(e) => update("timeLimit", +e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Multiple Attempts
            </td>
            <td>
              <Form.Check
                type="switch"
                checked={localQuiz.multipleAttempts || false}
                onChange={(e) => update("multipleAttempts", e.target.checked)}
                label={localQuiz.multipleAttempts ? "Yes" : "No"}
              />
              {localQuiz.multipleAttempts && (
                <Form.Control
                  type="number"
                  className="w-25 align-middle mt-2"
                  value={localQuiz.howManyAttempts || 1}
                  min={1}
                  onChange={(e) => update("howManyAttempts", +e.target.value)}
                  placeholder="Max attempts"
                />
              )}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Show Correct Answers
            </td>
            <td>
              <Form.Select
                className="w-25 align-middle"
                value={localQuiz.showCorrectAnswers || "Immediately"}
                onChange={(e) => update("showCorrectAnswers", e.target.value)}
              >
                <option>Immediately</option>
                <option>After Due Date</option>
                <option>Never</option>
              </Form.Select>
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">Access Code</td>
            <td>
              <Form.Control
                className="w-25 align-middle"
                type="password"
                value={localQuiz.accessCode || ""}
                onChange={(e) => update("accessCode", e.target.value)}
                placeholder="Leave blank for none"
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              One Question at a Time
            </td>
            <td>
            <Form.Select
              className="w-25 align-middle"
              value={localQuiz.oneQuestionAtATime === true ? "true" : "false"}
              onChange={(e) =>
                update("oneQuestionAtATime", e.target.value === "true")
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>

            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Webcam Required
            </td>
            <td>
              <Form.Select
                className="w-25 align-middle"
                value={localQuiz.webcamRequired || "No"}
                onChange={(e) => update("webcamRequired", e.target.value)}
              >
                <option>Yes</option>
                <option>No</option>
              </Form.Select>
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Lock Questions After Answering
            </td>
            <td>
              <Form.Select
                className="w-25 align-middle"
                value={localQuiz.lockAfterAnswer || "No"}
                onChange={(e) => update("lockAfterAnswer", e.target.value)}
              >
                <option>Yes</option>
                <option>No</option>
              </Form.Select>
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">Due Date</td>
            <td>
              <Form.Control
                className="w-25 align-middle"
                type="datetime-local"
                value={toInputDateTime(localQuiz.dueDate)}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">
              Available From
            </td>
            <td>
              <Form.Control
                className="w-25 align-middle"
                type="datetime-local"
                value={toInputDateTime(localQuiz.availableFrom)}
                onChange={(e) => update("availableFrom", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end w-25 align-middle">Until</td>
            <td>
              <Form.Control
                className="w-25 align-middle"
                type="datetime-local"
                value={toInputDateTime(localQuiz.availableUntil)}
                onChange={(e) => update("availableUntil", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="mt-4 text-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="me-2"
          onClick={() => handleSave(false)}
        >
          Save
        </Button>
        <Button variant="success" onClick={() => handleSave(true)}>
          Save & Publish
        </Button>
      </div>
    </Form>
  );
}
