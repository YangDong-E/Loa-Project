import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosDefault from '../config/axios'

export const fetchAuctionItems = createAsyncThunk(
    'market/fetchAuctionItems',
    async (
        { CategoryCode, ItemName, PageNo, SortBy, SortOrder, ItemGrade },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosDefault.post('/markets/items', {
                Sort: SortBy || 'CURRENT_MIN_PRICE',
                CategoryCode,
                ItemName,
                PageNo,
                SortCondition: SortOrder || 'ASC',
                ItemGrade: ItemGrade || '',
            })
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error.message
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const marketSlice = createSlice({
    name: 'market',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        pageNo: 0,
        sortBy: 'CURRENT_MIN_PRICE', // Default sortBy
        sortOrder: 'ASC', // Default sortOrder
        itemGrade: '', // Default itemGrade
    },
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        },
        setItemGrade: (state, action) => {
            state.itemGrade = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctionItems.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAuctionItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.Items
                state.pageNo = action.meta.arg.PageNo
            })
            .addCase(fetchAuctionItems.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export const { setSortBy, setSortOrder, setItemGrade } = marketSlice.actions

export default marketSlice.reducer
