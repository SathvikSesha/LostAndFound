import api from "./axiosConfig";

const LOGIN_URL = "/lost-found/login";
const STUD_URL = "/lost-found/student";

export const registerNewUser = (user) => api.post(LOGIN_URL, user);
export const validateUser = (userId, password) =>
  api.get(`${LOGIN_URL}/${userId}/${password}`);
export const getUserDetails = () => api.get(LOGIN_URL);
export const getAllStudents = () => api.get(STUD_URL);
export const getTotalStudents = () => api.get(`${STUD_URL}/count`);
export const deleteStudentByUsername = (username) =>
  api.delete(`${STUD_URL}/${username}`);
