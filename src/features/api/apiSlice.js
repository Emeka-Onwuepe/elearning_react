import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const baseUrl = 'http://127.0.0.1:8000'

export const elearningApi = createApi({
  reducerPath: 'elearningApi',
  baseQuery: fetchBaseQuery({ baseUrl,
    prepareHeaders(headers){
        headers.set("Content-Type", "application/json")
        return headers
    }
    }),
  tagTypes: ['user'],
  endpoints: (builder) => ({

    login: builder.mutation({
      query: data =>({
        url: "/api/login",
        method:"POST",
        body: data
      }),
      // transformResponse : (response,meta,arg) => response.data,
      // transformErrorResponse : response => response.status,
      invalidatesTags: ['user']
    }),
    

  }),
})


export const {useLoginMutation} = elearningApi
