import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading: false,
    error:false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state)=>{
            state.loading = true
        },
        signInSuccess : (state, action) =>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFailure : (state, action) =>{
            state.loading = false
            state.error = action.payload
        },
        signout : (state)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = false
        },
        updateSuccess : (state, action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, signout, updateSuccess } = userSlice.actions 
export default userSlice.reducer