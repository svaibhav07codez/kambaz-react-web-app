import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// export const findEnrollments = async (userId: string) => {
//     const response = await axios.get(`${ENROLLMENTS_API}/${userId}`);
//     return response.data;
// }
export const enrollUser = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/${courseId}/${userId}`);
  return response.data;
};

export const unenrollUser = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/${courseId}/${userId}`
  );
  return response.data;
};
