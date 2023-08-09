import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  signUpReducer from "./reducers/userReducers";
import resultReducer from "./reducers/result_reducer";
import questionReducer from "./reducers/question_reducer";
import uniqueIdReducer from "./reducers/uniqueIdReducer";
import adminReducer from "./reducers/adminReducer";
import userDetailReducer from "./reducers/userDetailReducer";

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
    userData: signUpReducer,
    uniqueId: uniqueIdReducer,
    admin: adminReducer,
    userDetails: userDetailReducer,
})

/** create store with reducer */
export default configureStore({ reducer : rootReducer, devTools: true});

// export default store;