import { LOGIN, LOGOUT } from "../actions/action-types"

const initialState = {
    isLoggedIn: false,
    username: "",
    firstName: "",
    lastName: "",
    leetcodeHandle: "",
    codeforcesHandle: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { 
                isLoggedIn: true,
                username: action.payload.username, 
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName,
                leetcodeHandle: action.payload.leetcodeHandle,
                codeforcesHandle: action.payload.codeforcesHandle
            }
        case LOGOUT:
            return {
                isLoggedIn: false,
                username: "",
                firstName: "",
                lastName: "",
                leetcodeHandle: "",
                codeforcesHandle: ""
            }
        default:
            return state
    }
}