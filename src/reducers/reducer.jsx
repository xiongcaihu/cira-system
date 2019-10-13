import { actions } from "../actions/actions.jsx";

export default (state, action) => {
    var newState = {};
    switch (action.type) {
        case actions.CHANGE_DEFAULT_MENU:
            newState = { ...state, defaultMenu: action.data };
            break;
        case actions.CHANGE_USER_INFO:
            newState = { ...state, user: action.data };
            break;
        default:
            newState = { ...state };
    }
    window.localStorage.setItem("store", JSON.stringify(newState));
    return newState;
};
