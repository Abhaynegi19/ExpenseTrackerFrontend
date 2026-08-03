import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recent : [],
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    allExpenses : []
}

const userTransactionSlice = createSlice({
    name: "userTransaction",
    initialState,
    reducers: {
        addUserTransaction: (state, action) => {
            state.totalExpense = action.payload.totalExpense,
            state.totalIncome = action.payload.totalIncome,
            state.balance = action.payload.balance
        },
        addUserRecentTransaction : (state,action) =>{
            state.recent = action.payload
        },
        addUserExpenses : (state,action) =>{
            state.allExpenses = action.payload
        }
    }
});

export const { addUserTransaction , addUserRecentTransaction , addUserExpenses} = userTransactionSlice.actions;

export default userTransactionSlice.reducer;