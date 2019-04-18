import * as Constants from "./constants";

export const cartReducer = (state = {addressIsEditing: false, phoneIsEditing: false, nameIsEditing: false}, action) => {
    switch(action.type){
        case Constants.EDIT_ADDRESS:
            state = {...state, addressIsEditing: action.edit};
            return state
        case Constants.EDIT_NAME:
            state = {...state, nameIsEditing: action.edit};
            return state
        case Constants.EDIT_PHONE:
            state = {...state, phoneIsEditing: action.edit};
            return state
        default: {
            return state;
        }
    }
}

export default cartReducer;