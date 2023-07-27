import axios from "axios";

axios.defaults.baseURL = "https://localhost:7064";

export const setApiToken = (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;