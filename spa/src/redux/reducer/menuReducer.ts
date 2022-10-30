import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getMenusAuth, getMenusPublic } from '../../api'
import { IMenus } from '../../model'
import { IInitialState } from '../model'

export const fetchGetMenusPublic = createAsyncThunk(
  'menus/fetchGetMenusPublic',
  async () => {
    const response = await getMenusPublic()
    return response.data
  }
)

export const fetchGetMenusAuth = createAsyncThunk(
  'menus/fetchGetMenusAuth',
  async () => {
    const response = await getMenusAuth()
    return response.data
  }
)

const initialState: IInitialState = {
  loading: false,
  data: { Public: [], User: [], Admin: [] },
  status: 'none',
}

const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    // Get API Public
    [fetchGetMenusPublic.pending.toString()]: (state: IInitialState) => {
      state.loading = true
      state.status = 'none'
    },
    [fetchGetMenusPublic.fulfilled.toString()]: (
      state: IInitialState,
      action: PayloadAction<IMenus>
    ) => {
      state.loading = false
      state.data = {
        Public: action.payload?.data?.Public ?? [],
        Admin: action.payload?.data?.Admin ?? [],
        User: action.payload?.data?.User ?? [],
      }
      state.status = 'success'
    },
    [fetchGetMenusPublic.rejected.toString()]: (state: IInitialState) => {
      state.loading = false
      state.data = initialState.data
      state.status = 'error'
    },

    // Get API Auth
    [fetchGetMenusAuth.pending.toString()]: (state: IInitialState) => {
      state.loading = true
      state.status = 'none'
    },
    [fetchGetMenusAuth.fulfilled.toString()]: (
      state: IInitialState,
      action: PayloadAction<IMenus>
    ) => {
      state.loading = false
      state.data = {
        Public: action.payload?.data?.Public ?? [],
        Admin: action.payload?.data?.Admin ?? [],
        User: action.payload?.data?.User ?? [],
      }
      state.status = 'success'
    },
    [fetchGetMenusAuth.rejected.toString()]: (state: IInitialState) => {
      state.loading = false
      state.data = initialState.data
      state.status = 'error'
    },
  },
})

const menuReducer = menuSlice.reducer

export default menuReducer
export const menuReducerReset = menuSlice.actions.reset
