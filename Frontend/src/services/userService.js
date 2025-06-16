import axios from "axios";
const USER_URL = "http://localhost:3000/api/users/users";

export const getAllUsers = async () => axios.get(USER_URL);
