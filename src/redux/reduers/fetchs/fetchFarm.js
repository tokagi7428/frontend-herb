import { createSlice } from '@reduxjs/toolkit'
import { getAllFarms } from '../../actions/farmAction.js'


export const farmSlice = createSlice({
    name: "farms",
    initialState: {
        farms: [],
        isLoading: false,
        error: "",
    },

    extraReducers: {
        [getAllFarms.pending]: (state) => {
            state.isLoading = true
        },
        [getAllFarms.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.farms = action.payload;
            state.isLoading = false
        },
        [getAllFarms.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default farmSlice.reducer

