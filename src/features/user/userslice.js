import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    id:0,first_name:"",last_name:"",
    email:"",user_type:"",phone_number:'',
    is_general_admin:false,
    completed_course_units:[],
    completed_courses:[],
    completed_course_sets:[],
    courses:[],course_sets:[],
    usertoken:"",
    logedin: false,
}


let userData = JSON.parse(localStorage.getItem("e_user"))
if(!userData){
  localStorage.setItem("e_user", JSON.stringify(initialData))
  userData = initialData
}

const initialState = {
  id: userData.id, first_name:userData.first_name,
  last_name:userData.last_name,
  email:userData.email, user_type:userData.user_type,
  phone_number:userData.phone_number,
  is_general_admin:userData.is_general_admin,
  completed_course_units:userData.completed_course_units,
  completed_courses:userData.completed_courses,
  completed_course_sets:userData.completed_course_sets,
  courses:[],course_sets:[],
  usertoken:userData.usertoken,
  logedin: userData.logedin,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createUser: (state,action) => {
        for (const key in action.payload) {
           state[key] = action.payload[key]
        }
        localStorage.setItem("e_user", JSON.stringify(action.payload))
    },
    logoutUser: (state)=>{
      for (const key in state) {
        state[key] = initialData[key]
     }
     console.log(state.usertoken)
     localStorage.setItem("e_user", JSON.stringify(initialData))
    }
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { createUser,logoutUser} = userSlice.actions;

export default userSlice.reducer;
