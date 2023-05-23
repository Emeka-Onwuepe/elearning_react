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
  tagTypes: ['userlogin','DeletePurchase'],
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
        const {course_sets,courses,uniques,
            public_key,available_courses} = response
        course_sets.forEach(course_set=>{
          course_set.course_set_unit.forEach(elem=>{
            let [course] = courses.filter(x=>x.id === elem.course)
            elem.name = course.name
            elem.weeks = course.course_week.length
            elem.display_image = course.display_image
          })
        })
      return {course_sets,uniques,
              public_key,available_courses}
          }
      // transformErrorResponse : response => response.status,
      // invalidatesTags: ['userlogin']
    }),  

    getCourse : builder.query({
      query: data =>({
        url: `/api/getcourse?id=${data.id}`,
        headers: {"Authorization": `Token ${data.token}`}
      }),
      transformResponse : (response,meta,arg) =>{
        const {course,units,materials} = response

        const mapper = []

        course.course_week.forEach((week,index)=>{
          week.course_unit.forEach(id=>{
            
            let [select_unit]  = units.filter(item=>item.id == id)
            materials.forEach(material=>{
              if(material.id == select_unit.material.id){
                const lesson_id = material[material.material_type].id
                const type = material.material_type
                mapper.push(`${index+1}-${lesson_id}-${type}`)
                
              }
            })
        
          })
        })

        response.mapper = mapper
        return response
      }
    }), 
    
    getlesson : builder.query({
      query: data =>({
        url: `/api/getlesson?id=${data.id}&type=${data.type}`,
        headers: {"Authorization": `Token ${data.token}`}
      }),
     
    }), 

    setUser : builder.mutation({
      query: token =>({
        url: `/api/setuser`,
        headers: {"Authorization": `Token ${token}`},
        method:"POST",
      }),

    }),

    processPurchase : builder.mutation({
      query: data =>({
        url: `/api/processpurchase`,
        headers: {"Authorization": `Token ${data.token}`},
        method:"POST",
        body:data.data,
      }),
      // invalidatesTags: ['DeletePurchase']
      // invalidatesTags: ['deletePurchase']
    }),

    getPurchases : builder.query({
      query: token =>({
        url: `/api/getpurchases`,
        // providesTags: ['DeletePurchase'],
        headers: {"Authorization": `Token ${token}`}
        
      }),
      
      // transformErrorResponse : response => response.status,
      // invalidatesTags: ['userlogin']
      // invalidatesTags: ['deletePurchase']
      
    }), 

    deletePurchase : builder.mutation({
      query: data =>({
        url: "/api/deletepurchase",
        headers: {"Authorization": `Token ${data.token}`},
        method:"POST",
        body: data.id,
        //  provideTag: ['deletepurchase']
        // providesTags: ['deletePurchase']
      }),
      // transformResponse : (response,meta,arg) => response.data,
      // transformErrorResponse : response => response.status,
      // invalidatesTags: ['deletepurchase']
      // invalidatesTags: ['DeletePurchase']
    }),

    getcategory: builder.query({
      query: data =>({
        url: `/api/getcategory?id=${data.id}&name=${data.name}`,
        headers: {"Authorization": `Token ${data.token}`}
      }),
      
      // transformErrorResponse : response => response.status,
      // invalidatesTags: ['userlogin']
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
              useGetlessonQuery, useSetUserMutation,
              useProcessPurchaseMutation,useGetPurchasesQuery,
              useGetcategoryQuery, useDeletePurchaseMutation,
              } = elearningApi
