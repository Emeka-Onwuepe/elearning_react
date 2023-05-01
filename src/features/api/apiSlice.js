import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { filterList } from '../helperfuncs'

// Define a service using a base URL and expected endpoints
const baseUrl = 'http://127.0.0.1:8000'

export const elearningApi = createApi({
  reducerPath: 'elearningApi',
  baseQuery: fetchBaseQuery({ baseUrl,
    prepareHeaders(headers,{getState}){
        headers.set("Content-Type", "application/json")
        return headers
    }
    }),
  tagTypes: ['userlogin'],
  endpoints: (builder) => ({

    login: builder.mutation({
      query: data =>({
        url: "/api/login",
        method:"POST",
        body: data
      }),
      // transformResponse : (response,meta,arg) => response.data,
      // transformErrorResponse : response => response.status,
      invalidatesTags: ['userlogin']
    }),

    registerUser : builder.mutation({
      query: data =>({
        url: "/api/register",
        method:"POST",
        body: data
      }),
      // transformResponse : (response,meta,arg) => response.data,
      // transformErrorResponse : response => response.status,
      invalidatesTags: ['userlogin']
    }),  

    getSchool : builder.query({
      query: schoolId =>({
        url: `/api/getschool?id=${schoolId}`,
      }),
      transformResponse : (response,meta,arg) =>{
        // filter list
        const {classes} = response
       const filtered_classes = [] 
       classes.forEach((value)=>{
        if(filtered_classes.length == 0){
            filtered_classes.push({id:value.id,name:value.name})
        }else{
            let add = true
            filtered_classes.forEach(item=>{
                if (item.id == value.id){
                    add = false
                }
            })
            if(add){
                filtered_classes.push({id:value.id,name:value.name})
                add = true
            }
        }
       })
       response.classes = filtered_classes
       return response
      },
      // transformErrorResponse : response => response.status,
      invalidatesTags: ['userlogin']
    }),  

    registerStudent : builder.mutation({
      query: data =>({
        url: "/api/getschool",
        method:"POST",
        body: data
      }),
      // transformResponse : (response,meta,arg) => response.data,
      // transformErrorResponse : response => response.status,
      invalidatesTags: ['userlogin']
    }),

    getCourses : builder.query({
      query: token =>({
        url: `/api/getcourses`,
        headers: {"Authorization": `Token ${token}`}
      }),
      
      transformResponse : (response,meta,arg) =>{
        const {course_sets,courses,uniques} = response
        course_sets.forEach(course_set=>{
          course_set.course_set_unit.forEach(elem=>{
            let [course] = courses.filter(x=>x.id === elem.course)
            elem.name = course.name
            elem.weeks = course.course_week.length
          })
        })
      return {course_sets,uniques}
      }
      // transformErrorResponse : response => response.status,
      // invalidatesTags: ['userlogin']
    }),  

    getCourse : builder.query({
      query: data =>({
        url: `/api/getcourse?id=${data.id}`,
        headers: {"Authorization": `Token ${data.token}`}
      }),
     
    }), 
    
    getlesson : builder.query({
      query: data =>({
        url: `/api/getlesson?id=${data.id}&type=${data.type}`,
        headers: {"Authorization": `Token ${data.token}`}
      }),
     
    }), 

    logout : builder.mutation({
      query: token =>({
        url: `/api/logout`,
        headers: {"Authorization": `Token ${token}`},
        method:"POST",
      }),

    })

  }),
})


export const {useLoginMutation,useRegisterUserMutation,
              useRegisterStudentMutation,useGetSchoolQuery,
              useGetCoursesQuery, useGetCourseQuery,useLogoutMutation,
              useGetlessonQuery,
              } = elearningApi
