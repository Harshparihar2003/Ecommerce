import axios from "axios"
import { base_url } from "../../utils/base_url"

const getColors = async() => {
    const response = await axios.get(`${base_url}category/getcategory`);
    console.log(response)
}

const colorService = {
    getColors,
}

export default colorService;