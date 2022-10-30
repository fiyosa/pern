import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getCategories } from '../../api'
import { ICategories } from '../../model'
import { IInitialState } from '../model'

export const fetchGetCategory = createAsyncThunk(
  'category/fetchGetCategory',
  async (url?: string) => {
    const response = await getCategories(url)
    return response.data
  }
)

const initialState: IInitialState = {
  loading: false,
  data: [],
  status: 'none',
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [fetchGetCategory.pending.toString()]: (state: IInitialState) => {
      state.loading = true
      state.status = 'none'
    },
    [fetchGetCategory.fulfilled.toString()]: (
      state: IInitialState,
      action: PayloadAction<ICategories>
    ) => {
      state.loading = false
      state.data = action.payload.data
      state.status = 'success'
    },
    [fetchGetCategory.rejected.toString()]: (state: IInitialState) => {
      state.loading = false
      state.data = initialState.data
      state.status = 'error'
    },
  },
})

const categoryReducer = categorySlice.reducer

export default categoryReducer
export const categoryReducerReset = categorySlice.actions.reset
