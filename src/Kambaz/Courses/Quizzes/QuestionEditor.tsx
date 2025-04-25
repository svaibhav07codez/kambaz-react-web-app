import { useState } from "react";

export default function QuestionEditor({
  question,
  editing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: any) {
  const [q, setQ] = useState({ ...question });

  const update = (field: string, value: any) => setQ({ ...q, [field]: value });

  const updateChoice = (index: number, value: string) => {
    const updated = [...q.choices];
    updated[index].text = value;
    setQ({ ...q, choices: updated });
  };

  const setCorrectChoice = (index: number) => {
    const updated = q.choices.map((c: any, i: number) => ({
      ...c,
      isCorrect: i === index,
    }));
    setQ({ ...q, choices: updated });
  };

  const addChoice = () => {
    setQ({ ...q, choices: [...q.choices, { text: "", isCorrect: false }] });
  };

  const removeChoice = (index: number) => {
    const updated = [...q.choices];
    updated.splice(index, 1);
    setQ({ ...q, choices: updated });
  };

  const updateAnswer = (index: number, value: string) => {
    const updated = [...q.correctAnswers];
    updated[index] = value;
    setQ({ ...q, correctAnswers: updated });
  };

  const addAnswer = () => {
    setQ({ ...q, correctAnswers: [...(q.correctAnswers || []), ""] });
  };

  const removeAnswer = (index: number) => {
    const updated = [...q.correctAnswers];
    updated.splice(index, 1);
    setQ({ ...q, correctAnswers: updated });
  };

  if (!editing) {
    return (
      <div>
        <h5>{question.title}</h5>
        <p>{question.question}</p>
        <button className="btn btn-outline-primary me-2" onClick={onEdit}>
          Edit
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => onDelete(question._id)}
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 border rounded bg-light">
      <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
        <div className="me-3 flex-fill">
          <label htmlFor="quiz-title" className="form-label">
            Title
          </label>
          <input
            id="quiz-title"
            type="text"
            value={q.title}
            onChange={(e) => update("title", e.target.value)}
            className="form-control"
            placeholder="Enter question title"
          />
        </div>

        <div className="me-3">
          <label htmlFor="quiz-question-type" className="form-label">
            Question Type
          </label>
          <select
            id="quiz-question-type"
            className="form-select"
            value={q.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
        </div>

        <div style={{ width: "100px" }}>
          <label htmlFor="quiz-points" className="form-label">
            Points
          </label>
          <input
            id="quiz-points"
            type="number"
            className="form-control"
            value={q.points}
            onChange={(e) => update("points", +e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="quiz-question-text" className="form-label">
          Question Text
        </label>
        <textarea
          id="quiz-question-text"
          value={q.question}
          onChange={(e) => update("question", e.target.value)}
          className="form-control"
          rows={3}
          placeholder="Enter question text"
        />
      </div>

      {/* MULTIPLE CHOICE */}
      {q.type === "MULTIPLE_CHOICE" && (
        <div className="border-bottom pb-3 mb-3">
          <label className="form-label fw-bold">Answers</label>
          {q.choices.map((choice: any, index: number) => (
            <div className="input-group mb-2" key={index}>
              <span className="input-group-text">
                <input
                  type="radio"
                  checked={choice.isCorrect}
                  aria-label={`Set answer ${index + 1} as correct`}
                  onChange={() => setCorrectChoice(index)}
                />
              </span>
              <input
                value={choice.text}
                onChange={(e) => updateChoice(index, e.target.value)}
                className={`form-control ${
                  choice.isCorrect ? "border-success" : ""
                }`}
                placeholder={`Possible Answer ${index + 1}`}
                aria-label={`Possible Answer ${index + 1}`}
              />
              {choice.isCorrect && (
                <span className="input-group-text text-success fw-bold">✔</span>
              )}
              {q.choices.length > 2 && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeChoice(index)}
                  aria-label="Remove answer"
                >
                  🗑
                </button>
              )}
            </div>
          ))}
          <button
            className="btn btn-outline-secondary"
            onClick={addChoice}
            aria-label="Add another multiple choice answer"
          >
            + Add Another Answer
          </button>
        </div>
      )}

      {/* TRUE / FALSE */}
      {q.type === "TRUE_FALSE" && (
        <div className="border-bottom pb-3 mb-3">
          <label className="form-label fw-bold">Answers</label>
          <div className="form-check">
            <input
              id={`true-option-${q._id}`}
              type="radio"
              className="form-check-input"
              checked={q.correctAnswer === true}
              onChange={() => update("correctAnswer", true)}
            />
            <label
              className="form-check-label"
              htmlFor={`true-option-${q._id}`}
            >
              True
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              id={`false-option-${q._id}`}
              type="radio"
              className="form-check-input"
              checked={q.correctAnswer === false}
              onChange={() => update("correctAnswer", false)}
            />
            <label
              className="form-check-label"
              htmlFor={`false-option-${q._id}`}
            >
              False
            </label>
          </div>
        </div>
      )}

      {/* FILL IN THE BLANK */}
      {q.type === "FILL_BLANK" && (
        <div className="border-bottom pb-3 mb-3">
          <label className="form-label fw-bold">Possible Correct Answers</label>
          {q.correctAnswers?.map((ans: string, index: number) => (
            <div key={index} className="input-group mb-2">
              <input
                value={ans}
                onChange={(e) => updateAnswer(index, e.target.value)}
                className="form-control"
                placeholder={`Possible Answer ${index + 1}`}
              />
              {q.correctAnswers.length > 1 && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeAnswer(index)}
                  aria-label="Remove answer"
                >
                  🗑
                </button>
              )}
            </div>
          ))}
          <button
            className="btn btn-outline-secondary"
            onClick={addAnswer}
            aria-label="Add another fill-in-the-blank answer"
          >
            + Add Another Answer
          </button>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="mt-4 text-end">
        <button className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onSave(q)}>
          Update Question
        </button>
      </div>
    </div>
  );
}
