import { createSlice } from "@reduxjs/toolkit"
const UserSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeUSer:(state,action)=>{
            return null;
        }
    }
})

export const {addUser,removeUSer}=UserSlice.actions;
export default UserSlice.reducer;