import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './reducer/categoryReducer'
import menuReducer from './reducer/menuReducer'
import userReducer from './reducer/userReducer'

export const store = configureStore({
  reducer: {
    menuReducer,
    userReducer,
    categoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
