/*import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";
import { Button, Card, Form, Table, Alert } from "react-bootstrap";

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<any>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const load = async () => {
      const q = await quizzesClient.getQuizById(qid!);
      const qs = await quizzesClient.getQuestions(qid!);
      setQuiz(q);
      setQuestions(qs);

      if (!isFaculty) {
        const a = await quizzesClient.getAttempts(qid!);
        setAttempts(a);

        const allowed = q.multipleAttempts ? q.howManyAttempts || 1 : 1;
        if (a.length < allowed) {
          setCurrentAttempt(null);
        } else {
          setCurrentAttempt(a[0]);
        }
      }
    };
    load();
  }, [qid]);

  const handleChange = (qid: string, value: any) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    if (isFaculty) {
      alert("This is a preview. Your attempt won’t be saved.");
      const previewAttempt = evaluateAnswers();
      setCurrentAttempt(previewAttempt);
      return;
    }

    if (attempts.length >= (quiz.howManyAttempts || 1)) {
      alert("You've reached the max number of attempts.");
      return;
    }

    const a = await quizzesClient.submitAttempt(qid!, answers);
    setAttempts([a, ...attempts]);
    setCurrentAttempt(a);
    setAnswers({});
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentAttempt(null);
  };

  const evaluateAnswers = () => {
    let score = 0;
    const answered = questions.map((q) => {
      const answer = answers[q._id];
      let correct = false;

      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices.find((c: any) => c.isCorrect);
        correct = correctChoice?.text === answer;
      } else if (q.type === "TRUE_FALSE") {
        correct = q.correctAnswer === answer;
      } else if (q.type === "FILL_BLANK") {
        correct = (q.correctAnswers || []).some(
          (ans: string) =>
            ans.toLowerCase().trim() === answer?.toLowerCase().trim()
        );
      }

      if (correct) score += q.points || 0;

      return {
        questionId: q._id,
        answer,
        correct,
      };
    });

    return {
      score,
      answers: answered,
      submittedAt: new Date().toISOString(),
    };
  };

  if (!quiz || questions.length === 0) return <div>Loading...</div>;

  if (!isFaculty && !quiz.published) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>
        <Alert variant="warning">This quiz is not published yet.</Alert>
      </div>
    );
  }

  const now = new Date();
  const availableFrom = quiz.availableFrom
    ? new Date(quiz.availableFrom)
    : null;
  const availableUntil = quiz.availableUntil
    ? new Date(quiz.availableUntil)
    : null;

  if (
    !isFaculty &&
    ((availableFrom && now < availableFrom) ||
      (availableUntil && now > availableUntil))
  ) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>
        <Alert variant="info">This quiz is not currently available.</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link
        to={`/Kambaz/Courses/${cid}/Quizzes`}
        className="btn btn-secondary mb-3"
      >
        ← Back to Quizzes
      </Link>

      <h2>{quiz.title}</h2>

      {!isFaculty && attempts.length > 0 && (
        <div className="mb-4">
          <h5>Previous Attempts</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, index) => (
                <tr key={a._id}>
                  <td>{attempts.length - index}</td>
                  <td>{new Date(a.submittedAt).toLocaleString()}</td>
                  <td>{a.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {quiz.multipleAttempts && !isFaculty && (
        <div className="text-muted mb-2">
          You’ve used {attempts.length} of {quiz.howManyAttempts || 1} attempts.
        </div>
      )}

      {questions.map((q, i) => {
        const submitted = currentAttempt?.answers?.find(
          (a: any) => a.questionId === q._id
        );
        const isCorrect = submitted?.correct;
        const answerValue = currentAttempt ? submitted?.answer : answers[q._id];

        return (
          <Card key={q._id} className="mb-4">
            <Card.Body>
              <Card.Title>Question {i + 1}</Card.Title>
              <Card.Text>{q.question}</Card.Text>

              {/* MULTIPLE CHOICE */ //}
              /*{q.type === "MULTIPLE_CHOICE" &&
                q.choices.map((c: any, idx: number) => (
                  <Form.Check
                    type="radio"
                    name={q._id}
                    key={idx}
                    disabled={!!currentAttempt}
                    checked={answerValue === c.text}
                    onChange={() => handleChange(q._id, c.text)}
                    label={
                      <>
                        {c.text}
                        {currentAttempt && c.text === submitted?.answer && (
                          <span
                            className={`ms-2 ${
                              isCorrect ? "text-success" : "text-danger"
                            }`}
                          >
                            {isCorrect ? "✓" : "✗"}
                          </span>
                        )}
                      </>
                    }
                  />
                ))}

              {/* TRUE / FALSE *///}
              /*{q.type === "TRUE_FALSE" &&
                ["True", "False"].map((val) => (
                  <Form.Check
                    key={val}
                    type="radio"
                    name={q._id}
                    disabled={!!currentAttempt}
                    checked={answerValue === (val === "True")}
                    onChange={() => handleChange(q._id, val === "True")}
                    label={
                      <>
                        {val}
                        {currentAttempt &&
                          (val === "True") === submitted?.answer && (
                            <span
                              className={`ms-2 ${
                                isCorrect ? "text-success" : "text-danger"
                              }`}
                            >
                              {isCorrect ? "✓" : "✗"}
                            </span>
                          )}
                      </>
                    }
                  />
                ))}

              {/* FILL IN THE BLANK *///}
              /*{q.type === "FILL_BLANK" && (
                <div>
                  <Form.Control
                    type="text"
                    disabled={!!currentAttempt}
                    value={answerValue || ""}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                  />
                  {currentAttempt && (
                    <div className="mt-2">
                      {isCorrect ? (
                        <span className="text-success">✓ Correct</span>
                      ) : (
                        <span className="text-danger">✗ Incorrect</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      <div className="mt-4 text-end">
        {currentAttempt ? (
          !isFaculty &&
          attempts.length < (quiz.howManyAttempts || 1) && (
            <Button variant="warning" onClick={handleRetake}>
              Retake Quiz
            </Button>
          )
        ) : (
          <Button variant="success" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
          className="btn btn-danger mx-3"
        >
          Back
        </Link>
      </div>
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";
import { Button, Card, Form, Table, Alert } from "react-bootstrap";

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFaculty = currentUser?.role === "FACULTY";

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const load = async () => {
      const q = await quizzesClient.getQuizById(qid!);
      const qs = await quizzesClient.getQuestions(qid!);
      setQuiz(q);
      setQuestions(qs);

      if (!isFaculty) {
        const a = await quizzesClient.getAttempts(qid!);
        setAttempts(a);

        const allowed = q.multipleAttempts ? q.howManyAttempts || 1 : 1;
        if (a.length < allowed) {
          setCurrentAttempt(null);
        } else {
          setCurrentAttempt(a[0]);
        }
      }
    };
    load();
  }, [qid]);

  const handleChange = (qid: string, value: any) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    if (isFaculty) {
      alert("This is a preview. Your attempt won’t be saved.");
      const previewAttempt = evaluateAnswers();
      setCurrentAttempt(previewAttempt);
      return;
    }

    if (attempts.length >= (quiz.howManyAttempts || 1)) {
      alert("You've reached the max number of attempts.");
      return;
    }

    const a = await quizzesClient.submitAttempt(qid!, answers);
    setAttempts([a, ...attempts]);
    setCurrentAttempt(a);
    setAnswers({});
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentAttempt(null);
    setCurrentIndex(0);
  };

  const evaluateAnswers = () => {
    let score = 0;
    const answered = questions.map((q) => {
      const answer = answers[q._id];
      let correct = false;

      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices.find((c: any) => c.isCorrect);
        correct = correctChoice?.text === answer;
      } else if (q.type === "TRUE_FALSE") {
        correct = q.correctAnswer === answer;
      } else if (q.type === "FILL_BLANK") {
        correct = (q.correctAnswers || []).some(
          (ans: string) =>
            ans.toLowerCase().trim() === answer?.toLowerCase().trim()
        );
      }

      if (correct) score += q.points || 0;

      return {
        questionId: q._id,
        answer,
        correct,
      };
    });

    return {
      score,
      answers: answered,
      submittedAt: new Date().toISOString(),
    };
  };

  if (!quiz || questions.length === 0) return <div>Loading...</div>;

  if (!isFaculty && !quiz.published) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>
        <Alert variant="warning">This quiz is not published yet.</Alert>
      </div>
    );
  }

  const now = new Date();
  const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
  const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

  if (!isFaculty && ((availableFrom && now < availableFrom) || (availableUntil && now > availableUntil))) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>
        <Alert variant="info">This quiz is not currently available.</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="btn btn-secondary mb-3">
        ← Back to Quizzes
      </Link>

      <h2>{quiz.title}</h2>

      {!isFaculty && attempts.length > 0 && (
        <div className="mb-4">
          <h5>Previous Attempts</h5>
          <Table bordered>
            <thead>
              <tr><th>#</th><th>Date</th><th>Score</th></tr>
            </thead>
            <tbody>
              {attempts.map((a, index) => (
                <tr key={a._id}>
                  <td>{attempts.length - index}</td>
                  <td>{new Date(a.submittedAt).toLocaleString()}</td>
                  <td>{a.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {quiz.multipleAttempts && !isFaculty && (
        <div className="text-muted mb-2">
          You’ve used {attempts.length} of {quiz.howManyAttempts || 1} attempts.
        </div>
      )}

      {quiz.oneQuestionAtATime ? (
        <>
          <QuestionCard
            q={questions[currentIndex]}
            i={currentIndex}
            currentAttempt={currentAttempt}
            answers={answers}
            handleChange={handleChange}
          />
          <div className="mt-4 d-flex justify-content-between">
            {currentIndex > 0 && <Button variant="secondary" onClick={back}>Back</Button>}
            {currentIndex < questions.length - 1 ? (
              <Button variant="primary" onClick={next}>Next</Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>Submit Quiz</Button>
            )}
          </div>
          <div className="mt-4">
            <h6>Questions</h6>
            <ul className="list-unstyled">
              {questions.map((_, idx) => (
                <li key={idx}>
                  <Button
                    variant={idx === currentIndex ? "link text-danger fw-bold" : "link text-secondary"}
                    onClick={() => setCurrentIndex(idx)}
                    className="text-decoration-none"
                  >
                    ○ Question {idx + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        questions.map((q, i) => (
          <QuestionCard
            key={q._id}
            q={q}
            i={i}
            currentAttempt={currentAttempt}
            answers={answers}
            handleChange={handleChange}
          />
        ))
      )}

      <div className="mt-4 text-end">
        {currentAttempt && !isFaculty && attempts.length < (quiz.howManyAttempts || 1) && (
          <Button variant="warning" onClick={handleRetake}>
            Retake Quiz
          </Button>
        )}
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`} className="btn btn-danger mx-3">
          Back
        </Link>
      </div>
    </div>
  );
}

function QuestionCard({ q, i, currentAttempt, answers, handleChange }: any) {
  const submitted = currentAttempt?.answers?.find((a: any) => a.questionId === q._id);
  const isCorrect = submitted?.correct;
  const answerValue = currentAttempt ? submitted?.answer : answers[q._id];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Question {i + 1}</Card.Title>
        <Card.Text>{q.question}</Card.Text>

        {q.type === "MULTIPLE_CHOICE" && q.choices.map((c: any, idx: number) => (
          <Form.Check
            key={idx}
            type="radio"
            name={q._id}
            disabled={!!currentAttempt}
            checked={answerValue === c.text}
            onChange={() => handleChange(q._id, c.text)}
            label={<>{c.text}{currentAttempt && c.text === submitted?.answer && (
              <span className={`ms-2 ${isCorrect ? "text-success" : "text-danger"}`}>{isCorrect ? "✓" : "✗"}</span>
            )}</>}
          />
        ))}

        {q.type === "TRUE_FALSE" && ["True", "False"].map((val) => (
          <Form.Check
            key={val}
            type="radio"
            name={q._id}
            disabled={!!currentAttempt}
            checked={answerValue === (val === "True")}
            onChange={() => handleChange(q._id, val === "True")}
            label={<>{val}{currentAttempt && (val === "True") === submitted?.answer && (
              <span className={`ms-2 ${isCorrect ? "text-success" : "text-danger"}`}>{isCorrect ? "✓" : "✗"}</span>
            )}</>}
          />
        ))}

        {q.type === "FILL_BLANK" && (
          <div>
            <Form.Control
              type="text"
              disabled={!!currentAttempt}
              value={answerValue || ""}
              onChange={(e) => handleChange(q._id, e.target.value)}
            />
            {currentAttempt && (
              <div className="mt-2">
                {isCorrect ? (
                  <span className="text-success">✓ Correct</span>
                ) : (
                  <span className="text-danger">✗ Incorrect</span>
                )}
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
