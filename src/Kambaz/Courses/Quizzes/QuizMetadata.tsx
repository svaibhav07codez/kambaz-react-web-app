export default function QuizMetadata({ quiz }: { quiz: any }) {
  return (
    <div>
      <p>Type: {quiz.type || "Graded Quiz"}</p>
      <p>Time Limit: {quiz.timeLimit || 20} minutes</p>
      <p>{quiz.shuffleAnswers ? "Shuffle: Yes" : "Shuffle: No"}</p>
      <p>
        Available: {quiz.availableFrom || "Not set"} –{" "}
        {quiz.availableUntil || "Not set"}
      </p>
      <p>Due Date: {quiz.dueDate || "Not set"}</p>
    </div>
  );
}
