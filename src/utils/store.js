import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user";
import userTransactionSlice from "./transaction";
import userBudgetSlice from  './userBudget'

const store = configureStore({
    reducer: {
        userInfo: userSlice,
        userTransaction: userTransactionSlice,
        userBudget : userBudgetSlice
    }
});

export default store;