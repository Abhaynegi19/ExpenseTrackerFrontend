import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",

    initialState: {},

    reducers: {
        addUserData: (state, action) => {
            return action.payload;
        }
    }
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;