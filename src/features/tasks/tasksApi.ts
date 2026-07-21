import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  }),
  tagTypes: ["Task"],
  endpoints: () => ({}),
})
