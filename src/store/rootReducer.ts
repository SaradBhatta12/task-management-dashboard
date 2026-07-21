import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "@/features/auth/authSlice"
import { tasksApi } from "@/features/tasks/tasksApi"
import tasksReducer from "@/features/tasks/tasksSlice"
import uiReducer from "@/features/ui/uiSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  ui: uiReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
