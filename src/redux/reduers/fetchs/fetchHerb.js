import { createSlice } from '@reduxjs/toolkit'
import { getAllherbs } from '../../actions/herbAction.js'

export const herbSlice = createSlice({
    name: "herbs",
    initialState: {
        herbs: [],
        isLoading: false,
        error: "",
    },

    extraReducers: {
        [getAllherbs.pending]: (state) => {
            state.isLoading = true
        },
        [getAllherbs.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.herbs = action.payload;
            state.isLoading = false
        },
        [getAllherbs.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default herbSlice.reducer

