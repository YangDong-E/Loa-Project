import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './characterSlice'
import marketReducer from './marketSlice'

export const store = configureStore({
    reducer: {
        character: characterReducer,
        market: marketReducer,
    },
})
