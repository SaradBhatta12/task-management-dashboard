import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { TaskPriority, TaskStatus } from "@/types/task"

export type StatusFilter = "all" | TaskStatus
export type PriorityFilter = "all" | TaskPriority
export type DueDateSort = "due-asc" | "due-desc"

export type TasksState = {
  search: string
  status: StatusFilter
  priority: PriorityFilter
  sort: DueDateSort
  selectedTaskId: string | null
}

export const initialTasksState: TasksState = {
  search: "",
  status: "all",
  priority: "all",
  sort: "due-asc",
  selectedTaskId: null,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    setTaskSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setStatusFilter(state, action: PayloadAction<StatusFilter>) {
      state.status = action.payload
    },
    setPriorityFilter(state, action: PayloadAction<PriorityFilter>) {
      state.priority = action.payload
    },
    setDueDateSort(state, action: PayloadAction<DueDateSort>) {
      state.sort = action.payload
    },
    setSelectedTaskId(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload
    },
    resetTaskFilters(state) {
      state.search = initialTasksState.search
      state.status = initialTasksState.status
      state.priority = initialTasksState.priority
      state.sort = initialTasksState.sort
    },
  },
})

export const {
  resetTaskFilters,
  setDueDateSort,
  setPriorityFilter,
  setSelectedTaskId,
  setStatusFilter,
  setTaskSearch,
} = tasksSlice.actions
export default tasksSlice.reducer
