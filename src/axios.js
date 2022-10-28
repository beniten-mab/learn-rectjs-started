import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL;
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;
