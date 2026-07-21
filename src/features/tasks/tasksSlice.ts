import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type TasksState = {
  search: string
}

const initialState: TasksState = {
  search: "",
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },
})

export const { setTaskSearch } = tasksSlice.actions
export default tasksSlice.reducer
