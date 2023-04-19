import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const baseUrl = 'http://127.0.0.1:8000/'

export const elearningApi = createApi({
  reducerPath: 'elearningApi',
  baseQuery: fetchBaseQuery({ baseUrl}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => "login",
    }),
  }),
})


export const {useLoginMutation} = elearningApi
