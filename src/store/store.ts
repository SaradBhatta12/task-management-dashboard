import { configureStore } from "@reduxjs/toolkit"

import { tasksApi } from "@/features/tasks/tasksApi"

import { rootReducer } from "./rootReducer"

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
