import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import usersReducer from './users-reducer.ts'


let reducers = combineReducers({
    usersData: usersReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;