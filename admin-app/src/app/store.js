import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import customerReducer from "../features/customers/customerSlice"
import productReducer from "../features/product/productSlice"
import brandReducer from "../features/brand/brandSlice"
import pCategoryReducer from "../features/pcategory/pcategorySlice"
import bCategoryReducer from "../features/bcategory/bCategorySlice"
import blogReducer from "../features/blogs/blogSlice"
import colorReducer from "../features/color/colorSlice"

export const store = configureStore({
    reducer : {auth : authReducer, customer : customerReducer, product : productReducer, brand : brandReducer, pCategory : pCategoryReducer, bCategory : bCategoryReducer, blogs : blogReducer, color : colorReducer},
    
})