import { useState } from "react";

export default function TrueFalseEditor({ question, onCancel, onSave }: any) {
  const [q, setQ] = useState(question);

  const update = (field: string, value: any) => setQ({ ...q, [field]: value });

  return (
    <div>
      <input
        value={q.title}
        onChange={(e) => update("title", e.target.value)}
        className="form-control mb-2"
        placeholder="Title"
      />
      <textarea
        value={q.question}
        onChange={(e) => update("question", e.target.value)}
        className="form-control mb-2"
        placeholder="Question"
      />
      <div>
        <label>
          <input
            type="radio"
            checked={q.correctAnswer === true}
            onChange={() => update("correctAnswer", true)}
          />{" "}
          True
        </label>
        <label className="ms-3">
          <input
            type="radio"
            checked={q.correctAnswer === false}
            onChange={() => update("correctAnswer", false)}
          />{" "}
          False
        </label>
      </div>
      <button className="btn btn-secondary me-2" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={() => onSave(q)}>
        Save
      </button>
    </div>
  );
}
