import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status_code: 0,
    message: null
}

export const errorSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addError: (state,action) => {
        state.status_code = action.payload.status_code
        state.message = action.payload.message
    },
   
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { addError} = errorSlice.actions;

export default errorSlice.reducer;