import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';

import { createBrands, getBrands, resetState } from '../features/brand/brandSlice';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().required("Brand name is Required"),

});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isError, isLoading, createdBrand } = newBrand
  
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully');
    }
    if (isError) {
      toast.error("Something went wrong")
    }
  }, [isSuccess, isError, isLoading,])

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
  })
  return (
    <div>
      <h3 className="mb-4 title">
        Add Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text"
            name="title" onChange={formik.handleChange("title")} val={formik.values.title} onBlur={formik.handleBlur("title")}
            label="Enter Brand" id="brand" />
          <div className="error">
            {
              formik.touched.title && formik.errors.title
            }
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand
