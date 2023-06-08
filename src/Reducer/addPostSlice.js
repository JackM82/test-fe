import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    post: null
}

export const addPost = createAsyncThunk(
    "sendPost/sendNewPost",
    async (data) => {
        try {
            const response = await fetch('http://localhost:5050/posts',{
                method: 'POST',                
                headers: {
                "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            })
            console.log(response)
            console.log(JSON.stringify(data))
            return await response.json()
        } catch (error) {
            console.log(error)
            if (error){
                throw new Error ('errore invio post')
            }
        }
    }
)

const sendPostSlice = createSlice({
    name: 'sendPost',
    initialState,
    extraReducers:builder => {
        builder
        .addCase(addPost.pending, state =>{
            state.isLoading = true
        })
        .addCase(addPost.fulfilled, (state, action) =>{
            state.isLoading = false
            state.response = action.payload
        })
        .addCase(addPost.rejected, state =>{
            state.isLoading = false
            state.error = 'Errore durante il login'
        })
    }
})

export const postSendResponse = state => state.sendPostState.response
export const postSendLoading = state => state.sendPostState.isLoading
export default sendPostSlice.reducer