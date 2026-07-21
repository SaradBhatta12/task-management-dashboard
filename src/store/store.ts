import { configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
  persistReducer,
} from "redux-persist"
import type { PersistConfig } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { tasksApi } from "@/features/tasks/tasksApi"
import {
  initialTasksState,
  type TasksState,
} from "@/features/tasks/tasksSlice"

import { rootReducer, type RootReducerState } from "./rootReducer"

const taskStateTransform = createTransform<
  TasksState,
  TasksState,
  RootReducerState,
  RootReducerState
>(
  (state) => state,
  (state) => ({ ...initialTasksState, ...state }),
  { whitelist: ["tasks"] },
)

const persistConfig: PersistConfig<RootReducerState> = {
  key: "taskflow",
  version: 1,
  storage,
  whitelist: ["auth", "tasks"],
  transforms: [taskStateTransform],
}

const persistedReducer = persistReducer<RootReducerState>(
  persistConfig,
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
