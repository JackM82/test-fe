import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false
}

export const loginRequest = createAsyncThunk(
    "login/userLogin",
    async (data) => {
        try {
            const response = await fetch('https://epiblog-jm.onrender.com/login',{
                method: 'POST',                
                headers: {
                "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            })
            console.log(response)
            return await response.json()
        } catch (error) {
            console.log(error)
            if (error){
                throw new Error ('errore ricezione dati')
            }
        }
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers:builder => {
        builder
        .addCase(loginRequest.pending, state =>{
            state.isLoading = true
        })
        .addCase(loginRequest.fulfilled, (state, action) =>{
            state.isLoading = false
            state.response = action.payload

            if (action.payload.statusCode === 200){
                localStorage.setItem("loggedIn",JSON.stringify(action.payload))
            }
        })
        .addCase(loginRequest.rejected, state =>{
            state.isLoading = false
            state.error = 'Errore durante il login'
        })
    }
})

export const loginResponse = state => state.loginState.response
export const loginLoading = state => state.loginState.isLoading
export default loginSlice.reducer



