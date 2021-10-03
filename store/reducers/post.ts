import { actions } from "../actions";

const postReducer = (post = null, action: any) => {
    switch (action.type) {
        case actions.setPostInfo:
            return post = action.value
        case actions.clearPostInfo:
            return post = null;
        default: return post;
    }
}

export default postReducer;