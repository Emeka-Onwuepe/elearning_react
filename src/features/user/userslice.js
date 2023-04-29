import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:0,first_name:"",last_name:"",
    email:"",user_type:"",phone_number:'',
    is_general_admin:false,
    completed_course_units:[],
    completed_courses:[],
    completed_course_sets:[],
    usertoken:"",
    logedin: false,
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
    },
  },
 
});

export const getuser = (state)=>state
export const getuserToken = (state)=>state.token
export const { createUser} = userSlice.actions;

export default userSlice.reducer;
