import axios from "axios"
import { base_url } from "../../utils/base_url"
const getTokenFromLocalStorage = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null;
const config = {
    headers : {
        Authorization : `Bearer ${getTokenFromLocalStorage.token}`,
        Accept : "application/json"
    }
}
const getColor = async() => {
    const response = await axios.get(`${base_url}color/getcolor/`,config);
    return response.data;
}

const colorService = {
    getColor,
}

export default colorService;