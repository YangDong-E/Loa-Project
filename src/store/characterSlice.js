import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosDefault from '../config/axios'

export const getCharacter = createAsyncThunk(
    'user/getCharacter',
    async (characterId, { rejectWithValue }) => {
        try {
            const response = await axiosDefault.get(
                `/armories/characters/${characterId}`
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error.message // Network error 에러메시지가 없으므로 네트워크 에러
            }
            return rejectWithValue(error.response) // Server error
        }
    }
)

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        characterProfile: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getCharacter.fulfilled, (state, action) => {
            state.characterProfile = action.payload
        })
    },
})

export default characterSlice.reducer
