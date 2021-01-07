import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import usersReducer from './users-reducer'
import userProfileReducer from './user-profile-reducer'


let reducers = combineReducers({
    usersData: usersReducer,
    userProfile: userProfileReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;