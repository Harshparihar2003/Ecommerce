import axios from "axios"
import { base_url } from "../../utils/base_url"
const getTokenFromLocalStorage = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null;
const config = {
    headers : {
        Authorization : `Bearer ${getTokenFromLocalStorage.token}`,
        Accept : "application/json"
    }
}
const getBlogCategories = async() => {
    const response = await axios.get(`${base_url}blogcategory/getcategory`,config);
    console.log(response)
    return response.data;
}
const createBlogCategory = async (bcat) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
  
    return response.data;
  };

const bCategoryService = {
    getBlogCategories,
    createBlogCategory
}

export default bCategoryService;