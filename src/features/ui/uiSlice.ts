import { createSlice } from "@reduxjs/toolkit"

export type UIState = {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
}

export const initialUIState: UIState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    openMobileSidebar(state) {
      state.mobileSidebarOpen = true
    },
    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false
    },
  },
})

export const { closeMobileSidebar, openMobileSidebar, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
