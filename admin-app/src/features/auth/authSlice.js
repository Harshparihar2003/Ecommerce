import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService"

const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user : getUserfromLocalStorage,
    orders : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

export const login = createAsyncThunk("auth/login", async(userData,thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getMonthlyData = createAsyncThunk("orders/monthlydata", async(userData,thunkAPI) => {
    try {
        return await authService.getMonthlyOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getYearlyData = createAsyncThunk("orders/yearlydata", async(userData,thunkAPI) => {
    try {
        return await authService.getYearlyStats()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk("order/get-orders", async(thunkAPI) => {
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)    
    }
})
export const getOrderByUser = createAsyncThunk(
    "order/get-order",
    async (id, thunkAPI) => {
      try {
        return await authService.getOrder(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(login.pending,
        (state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,
        (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        })
        .addCase(login.rejected,
        (state, action)=>{
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.user = null
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled,
            (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload
            })
        .addCase(getOrders.rejected,
            (state, action)=>{
                state.isLoading = false;
                state.isError = true
                state.isSuccess = false;
                state.user = null
        })
        .addCase(getOrderByUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrderByUser.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.orderbyuser = action.payload;
            state.message = "success";
          })
          .addCase(getOrderByUser.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
        .addCase(getMonthlyData.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getMonthlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.monthlyData = action.payload;
            state.message = "success";
          })
          .addCase(getMonthlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
        .addCase(getYearlyData.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getYearlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.yearlyData = action.payload;
            state.message = "success";
          })
          .addCase(getYearlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          });
    }
})

export default authSlice.reducer;