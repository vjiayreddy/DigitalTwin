import axios from "axios";

export const API = axios.create({
  baseURL: "https://ocr-image-project.herokuapp.com/api/dashboard/",
});
