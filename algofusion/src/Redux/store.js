import loginReducer from "./reducers/login-reducers";

const {createStore, combineReducers} = require("redux");

const rootReducer = combineReducers({loginReducer})

const store = createStore(rootReducer)

export default store