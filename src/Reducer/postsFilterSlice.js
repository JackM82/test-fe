import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    postsFiltered: []    
}

export const getPostsFiltered = createAsyncThunk(
    "post/getPosts",     
    ////rejectWithValue gestisce errore e lo mostra {rejectWithValue}
    async(paramSlice,{rejectWithValue})=> {         
        try {
            const data = await fetch(`https://epiblog-jm.onrender.com/posts/bytitle/${paramSlice}`) //${paramSlice}
            const response = await data.json()
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

const postsFilteredSlice = createSlice({
    name: 'postsFiltered',
    initialState,
    extraReducers:builder => {
        builder
        .addCase(getPostsFiltered.pending, state =>{
            state.isLoading = true
        })
        .addCase(getPostsFiltered.fulfilled, (state, action) =>{
            state.isLoading = false
            state.postsFiltered = action.payload
        })
        .addCase(getPostsFiltered.rejected, state =>{
            state.isLoading = false
            state.error = 'Errore ricezione posts'
        })        
    }
})

export const postsFilteredResponse = (state) => state.postsFilteredState.response
export const postsFilteredLoading = (state) => state.postsFilteredState.isLoading
export const postsFilteredArray = (state) => state.postsFilteredState.postsFiltered
export default postsFilteredSlice.reducer

