import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "@/features/auth/authSlice"
import { tasksApi } from "@/features/tasks/tasksApi"
import tasksReducer from "@/features/tasks/tasksSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
})
