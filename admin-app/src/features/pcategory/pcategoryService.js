import axios from "axios"
import { base_url } from "../../utils/base_url"

const getProductsCategories = async() => {
    const response = await axios.get(`${base_url}category/getcategory`);
    console.log(response)
    return response.data;
}

const pCategoryService = {
    getProductsCategories,
}

export default pCategoryService;