import axios from "axios"
import { base_url } from "../../utils/base_url"
const getTokenFromLocalStorage = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null;
const config = {
    headers : {
        Authorization : `Bearer ${getTokenFromLocalStorage.token}`,
        Accept : "application/json"
    }
}
const getProductsCategories = async() => {
    const response = await axios.get(`${base_url}category/getcategory`,config);
    console.log(response)
    return response.data;
}

const pCategoryService = {
    getProductsCategories,
}

export default pCategoryService;