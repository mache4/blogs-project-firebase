import { combineReducers } from "redux";
import postReducer from "./post";
import userReducer from "./user";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducer = combineReducers({
    userInfo: userReducer,
    postInfo: postReducer
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['userInfo']
};

export default persistReducer(persistConfig, reducer);