import { configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import { tasksApi } from "@/features/tasks/tasksApi"

import { rootReducer } from "./rootReducer"

const persistedReducer = persistReducer(
  {
    key: "taskflow",
    version: 1,
    storage,
    whitelist: ["auth", "tasks"],
  },
  rootReducer,
)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(tasksApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
