import { useState } from "react";

export default function MultipleChoiceEditor({
  question,
  onCancel,
  onSave,
}: any) {
  const [q, setQ] = useState(question);

  const update = (field: string, value: any) => setQ({ ...q, [field]: value });

  const updateChoice = (index: number, value: string) => {
    const newChoices = q.choices.map((choice: any, i: number) => ({
      ...choice,
      text: i === index ? value : choice.text, // update only text
    }));
    setQ({ ...q, choices: newChoices });
  };

  const setCorrectAnswer = (index: number) => {
    const updatedChoices = q.choices.map((choice: any, i: number) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setQ({ ...q, choices: updatedChoices });
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
      {q.choices.map((c: any, idx: number) => (
        <div key={idx} className="input-group mb-2">
          <input
            value={c.text}
            onChange={(e) => updateChoice(idx, e.target.value)}
            className="form-control"
          />
          <span className="input-group-text">
            <input
              type="radio"
              name="correctChoice"
              checked={c.isCorrect}
              onChange={() => setCorrectAnswer(idx)}
            />
          </span>
        </div>
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
