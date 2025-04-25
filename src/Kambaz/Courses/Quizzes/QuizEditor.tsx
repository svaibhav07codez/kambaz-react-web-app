import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";
import QuizSettingsForm from "./QuizSettingsForm";
import QuizMetadata from "./QuizMetadata";
import QuestionList from "./QuestionList";

export default function QuizEditor({
  defaultTab = "details",
}: {
  defaultTab?: string;
}) {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    const fetch = async () => {
      const data = await quizzesClient.getQuizById(qid!);
      setQuiz(data);
    };
    fetch();
  }, [qid]);

  const saveQuiz = async (updated: any) => {
    const status = await quizzesClient.updateQuiz(updated);
    if (status.modifiedCount > 0) {
      setQuiz(updated);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <Link
        to={`/Kambaz/Courses/${quiz.course}/Quizzes`}
        className="btn btn-secondary mb-3"
      >
        ← Back to Quizzes
      </Link>

      <h2>{quiz.title}</h2>
      <div className="btn-group mb-3">
        <button
          className={`btn btn-outline-danger ${
            tab === "details" ? "active" : ""
          }`}
          onClick={() => setTab("details")}
        >
          Details
        </button>
        <button
          className={`btn btn-outline-danger ${
            tab === "questions" ? "active" : ""
          }`}
          onClick={() => setTab("questions")}
        >
          Questions
        </button>
      </div>

      {tab === "details" ? (
        currentUser?.role === "FACULTY" ? (
          <QuizSettingsForm quiz={quiz} setQuiz={setQuiz} saveQuiz={saveQuiz} />
        ) : (
          <QuizMetadata quiz={quiz} />
        )
      ) : (
        <QuestionList
          quizId={qid!}
          updateQuizStats={({ totalPoints, numQuestions }) => {
            setQuiz((prev: any) => ({
              ...prev,
              points: totalPoints,
              questionsCount: numQuestions,
            }));
          }}
        />
      )}
    </div>
  );
}
