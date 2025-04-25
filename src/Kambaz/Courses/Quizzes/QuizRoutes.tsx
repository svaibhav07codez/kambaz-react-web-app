import { Routes, Route } from "react-router-dom";
import Quizzes from ".";
import QuizDetails from "./QuizDetails";
import QuizEditor from "./QuizEditor";
import QuizPreview from "./QuizPreview";

export default function QuizRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Quizzes />} />
      <Route path=":qid" element={<QuizDetails />} />
      <Route path=":qid/edit" element={<QuizEditor defaultTab="details" />} />
      <Route path=":qid/preview" element={<QuizPreview />} />
    </Routes>
  );
}
