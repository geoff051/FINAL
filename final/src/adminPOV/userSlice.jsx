import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users:[]
    },
    reducers: {
        getUser : (state, action) => {
            state.users = action.payload.map(user => {
                return {id: user._id, 
                    Firstname: user.Firstname,
                    Lastname: user.Lastname,
                    Grade: user.Grade, 
                    Section: user.Section,
                    LRN: user.LRN    
                }
            })
        }
    }
})

export const {getUser} = userSlice.actions;
export default userSlice.reducer;
