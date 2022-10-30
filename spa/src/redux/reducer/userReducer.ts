import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getUserAccount } from '../../api'
import { IAuthUser } from '../../model'
import { IInitialState } from '../model'

export const fetchGetUserAccount = createAsyncThunk(
  'user/fetchGetMenusPublic',
  async () => {
    const response = await getUserAccount()
    return response.data
  }
)

const initialState: IInitialState = {
  loading: false,
  data: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    role_id: '',
    role_name: '',
    permission: [],
  },
  status: 'none',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [fetchGetUserAccount.pending.toString()]: (state: IInitialState) => {
      state.loading = true
      state.status = 'none'
    },
    [fetchGetUserAccount.fulfilled.toString()]: (
      state: IInitialState,
      action: PayloadAction<IAuthUser>
    ) => {
      state.loading = false
      state.data = {
        id: action.payload?.data?.id ?? 0,
        first_name: action.payload?.data?.first_name ?? '',
        last_name: action.payload?.data?.last_name ?? '',
        email: action.payload?.data?.email ?? '',
        role_id: action.payload?.data?.role_id ?? 0,
        role_name: action.payload?.data?.role_name ?? '',
        permission: action.payload?.data?.permission ?? [],
      }
      state.status = 'success'
    },
    [fetchGetUserAccount.rejected.toString()]: (state: IInitialState) => {
      state.loading = false
      state.data = initialState.data
      state.status = 'error'
    },
  },
})

const userReducer = userSlice.reducer

export default userReducer
export const userReducerReset = userSlice.actions.reset
