import axios from "axios"
import { base_url } from "../../utils/base_url"

const getBlogCategories = async() => {
    const response = await axios.get(`${base_url}blogcategory/getcategory`);
    console.log(response)
    return response.data;
}

const bCategoryService = {
    getBlogCategories,
}

export default bCategoryService;