import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status_code: 0,
    message: null
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addAlert: (state,action) => {
        state.status_code = action.payload.status_code
        state.message = action.payload.message
    },
    clearAlert :state=>{
      state.status_code = 0
      state.message = null
    }
   
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { addAlert,clearAlert} = alertSlice.actions;

export default alertSlice.reducer;
