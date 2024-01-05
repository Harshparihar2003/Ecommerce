import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  // getAColor,
  resetState,
  // updateAColor,
} from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    // updatedColor,
    // colorName,
  } = newColor;
  // useEffect(() => {
    // if (getColorId !== undefined) {
      // dispatch(getAColor(getColorId));
    // } else {
      // dispatch(resetState());
    // }
  // }, [getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    // if (isSuccess && updatedColor) {
    //   toast.success("Color Updated Successfullly!");
      // navigate("/admin/list-color");
    // }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      // title: colorName || "",
      title : ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getColorId !== undefined) {
      //   const data = { id: getColorId, colorData: values };
      //   dispatch(updateAColor(data));
      //   dispatch(resetState());
      // } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      // }
    },
  });
  return (
    <div>
        <h3 className="mb-4 title">
            Add Color
        </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="color"
            label="Enter Product Color"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"/>
              <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColor
