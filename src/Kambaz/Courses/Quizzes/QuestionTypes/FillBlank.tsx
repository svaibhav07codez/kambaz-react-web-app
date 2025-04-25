import { useState } from "react";

export default function FillBlankEditor({ question, onCancel, onSave }: any) {
  const [q, setQ] = useState(question);

  const update = (field: string, value: any) => setQ({ ...q, [field]: value });

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...q.correctAnswers];
    newAnswers[index] = value;
    setQ({ ...q, correctAnswers: newAnswers });
  };

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
      <label>Possible Correct Answers</label>
      {q.correctAnswers?.map((ans: string, idx: number) => (
        <input
          key={idx}
          value={ans}
          onChange={(e) => updateAnswer(idx, e.target.value)}
          className="form-control mb-2"
        />
      ))}
      <button className="btn btn-secondary me-2" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={() => onSave(q)}>
        Save
      </button>
    </div>
  );
}
