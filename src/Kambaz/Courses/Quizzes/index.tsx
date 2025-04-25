import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setQuizzes, addQuiz, deleteQuiz, toggleQuizPublish } from "./reducer";
import * as quizzesClient from "./client";
import QuizControls from "./QuizControls";
import QuizCard from "./QuizCard";
import { ListGroup } from "react-bootstrap";
import { FaSortDown } from "react-icons/fa";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizStats, setQuizStats] = useState<
    Record<string, { points: number; questions: number }>
  >({});

  const fetchQuizzes = async () => {
    const data = await quizzesClient.findQuizzesForCourse(cid!);
    dispatch(setQuizzes(data));
    for (const quiz of data) {
      fetchQuizStats(quiz._id);
    }
  };

  const handleAdd = async () => {
    const newQuiz = await quizzesClient.createQuiz(cid!);
    dispatch(addQuiz(newQuiz));
  };

  const handleDelete = async (id: string) => {
    await quizzesClient.deleteQuiz(id);
    dispatch(deleteQuiz(id));
  };

  const handleTogglePublish = async (id: string) => {
    const updated = await quizzesClient.togglePublish(id);
    dispatch(toggleQuizPublish(updated));
  };

  const fetchQuizStats = async (quizId: string) => {
    const questions = await quizzesClient.getQuestions(quizId);
    const points = questions.reduce(
      (sum: any, q: any) => sum + (q.points || 0),
      0
    );
    setQuizStats((prev) => ({
      ...prev,
      [quizId]: {
        points,
        questions: questions.length,
      },
    }));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const visibleQuizzes =
    currentUser?.role === "FACULTY"
      ? quizzes
      : quizzes.filter((q: any) => q.published);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        {currentUser?.role === "FACULTY" && (
          <QuizControls addQuizHandler={handleAdd} />
        )}
      </div>
      <div className="mt-4 bg-secondary border border-dark rounded-0">
        <h5 className="fw-bold m-3 d-flex align-items-top">
          <FaSortDown className="fs-5 me-2" />
          Assignment Quizzes
        </h5>
      </div>

      {visibleQuizzes.length === 0 ? (
        <p className="mt-4">No quizzes available.</p>
      ) : (
        visibleQuizzes.map((quiz: any) => (
          <ListGroup className="border border-dark rounded-0 m-0 p-0">
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              stats={quizStats[quiz._id]}
            />
          </ListGroup>
        ))
      )}
    </div>
  );
}
