import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const createQuiz = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return data;
};

export const togglePublish = async (quizId: string) => {
  const { data } = await axiosWithCredentials.patch(
    `${QUIZZES_API}/quizzes/${quizId}/publish`
  );
  return data;
};

export const getQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};

export const getQuestions = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/questions`
  );
  return data;
};

export const createQuestion = async (quizId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/questions`
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/questions/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/questions/${id}`
  );
  return data;
};

export const submitAttempt = async (quizId: string, answers: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/attempts`,
    answers
  );
  return data;
};

export const getAttempts = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/attempts`
  );
  return data;
};
