import axios from "axios";

const ASSIGNMENTS_API = `${import.meta.env.VITE_REMOTE_SERVER}/api/assignments`;

export const fetchAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

export const createAssignment = async (assignment: any) => {
  const { data } = await axios.post(ASSIGNMENTS_API, assignment);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/course/${courseId}`);
  return data;
};
