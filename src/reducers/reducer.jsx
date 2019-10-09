import actions from "../actions/actions.jsx";

export default (state, action) => {
    var newState = {};
    switch (action.type) {
        case actions.CHANGE_NAME:
            newState = { ...state, name: action.data };
            break;
        default:
            newState = state;
    }
    window.localStorage.setItem("store", JSON.stringify(newState));
    return newState;
};
