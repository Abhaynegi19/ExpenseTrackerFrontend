import { createSlice } from "@reduxjs/toolkit";

const userBudget = createSlice({
    name : "userBudget",
    initialState : {},
    reducers : {
        adduserBudget : (state,action) =>{
            return action.payload
        }
    }

})

export const {adduserBudget} = userBudget.actions
export default userBudget.reducer