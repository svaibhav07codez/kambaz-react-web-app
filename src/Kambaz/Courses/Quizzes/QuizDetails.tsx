import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const data = await quizzesClient.getQuizById(qid!);
    setQuiz(data);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading quiz...</div>;

  const formatDateTime = (dt: string) => {
    const date = new Date(dt);
    return date.toLocaleString();
  };

  return (
    <div className="container mt-4">
      <Link
        to={`/Kambaz/Courses/${quiz.course}/Quizzes`}
        className="btn btn-secondary mb-3"
      >
        ← Back to Quizzes
      </Link>

      <div className="border p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold mb-3">{quiz.title}</h3>

          <div className="d-flex justify-content-end gap-2 mb-3 ms-auto">
            {currentUser?.role === "FACULTY" && (
              <>
                <Link
                  to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/preview`}
                  className="btn btn-success"
                >
                  Preview
                </Link>
                <Link
                  to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/edit`}
                  className="btn btn-danger"
                >
                  Edit
                </Link>
              </>
            )}
            {currentUser?.role === "STUDENT" && (
              <Link
                to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/preview`}
                className="btn btn-success"
              >
                Take Quiz
              </Link>
            )}
          </div>
        </div>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="fw-bold text-end w-25">Quiz Type</td>
              <td>{quiz.quizType || "Graded Quiz"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Points</td>
              <td>{quiz.points || 0}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Assignment Group</td>
              <td>{quiz.assignmentGroup || "Quizzes"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Time Limit</td>
              <td>{quiz.timeLimit || 20} Minutes</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Multiple Attempts</td>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Show Correct Answers</td>
              <td>{quiz.showCorrectAnswers || "Immediately"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">One Question at a Time</td>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Webcam Required</td>
              <td>{quiz.webcamRequired || "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">
                Lock Questions After Answering
              </td>
              <td>{quiz.lockAfterAnswer || "No"}</td>
            </tr>
            {currentUser?.role === "FACULTY" && (
              <tr>
                <td className="fw-bold text-end w-25">Access Code</td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
            )}
            <tr>
              <td className="fw-bold text-end w-25">Due</td>
              <td>{quiz.dueDate ? formatDateTime(quiz.dueDate) : "N/A"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Available from</td>
              <td>
                {quiz.availableFrom
                  ? formatDateTime(quiz.availableFrom)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="fw-bold text-end w-25">Until</td>
              <td>
                {quiz.availableUntil
                  ? formatDateTime(quiz.availableUntil)
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
