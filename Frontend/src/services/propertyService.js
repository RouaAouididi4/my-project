import axios from "axios";
const PROPERTIES_URL = "http://localhost:3000/api/properties";

export const getAllProperties = async () => axios.get(PROPERTIES_URL);
