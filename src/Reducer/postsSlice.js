import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    posts: []    
}

export const getPosts = createAsyncThunk(
    "post/getPosts",     
    ////rejectWithValue gestisce errore e lo mostra {rejectWithValue}
    async(paramSlice,{rejectWithValue})=> { 
        try {
            const data = await fetch(`https://epiblog-jm.onrender.com/posts?page=${paramSlice.page}&pageSize=${paramSlice.pageSize}`) 
            const response = await data.json()
            //console.log(response.posts)
            return response
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers:builder => {
        builder
        .addCase(getPosts.pending, state =>{
            state.isLoading = true
        })
        .addCase(getPosts.fulfilled, (state, action) =>{
            state.isLoading = false
            state.posts = action.payload
        })
        .addCase(getPosts.rejected, state =>{
            state.isLoading = false
            state.error = 'Errore ricezione posts'
        })        
    }
})

export const postsResponse = (state) => state.postsState.response
export const postsLoading = (state) => state.postsState.isLoading
export const postsArray = (state) => state.postsState.posts
export default postsSlice.reducer

