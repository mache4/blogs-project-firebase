import { actions } from "../actions";

const userReducer = (user = null, action: any) => {
    switch (action.type) {
        case actions.setUserInfo:
            return user = action.value;
        case actions.clearUserInfo:
            return user = null;
        default: return user;
    }
}

export default userReducer;