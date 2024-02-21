import axios from "axios";

const desigURL = "https://api.data.gov.sg/v1/"

const dataAPI = axios.create({baseURL:desigURL});

export default dataAPI