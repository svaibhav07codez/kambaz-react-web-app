import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLL_API = `${REMOTE_SERVER}/api/users/current/courses`;
const axiosWithCreds = axios.create({ withCredentials: true });

export const enrollUser = async (courseId: string) => {
  const { data } = await axiosWithCreds.post(`${ENROLL_API}/${courseId}`);
  return data;
};

export const unEnrollUser = async (courseId: string) => {
  const { data } = await axiosWithCreds.delete(`${ENROLL_API}/${courseId}`);
  return data;
};

export const fetchEnrollmentsForUser = async () => {
  const { data } = await axiosWithCreds.get(
    `${REMOTE_SERVER}/api/users/current/enrollments`
  );
  return data;
};
