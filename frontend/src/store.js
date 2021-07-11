import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {subListReducer,subDetailsReducer} from './reducers/subReducers'
import {userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer, } from './reducers/userReducer'
import { 
    orderDetailsReducer,
    orderCreateReducer,
    selectedSubReducer,
    orderPayReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    subList : subListReducer,
    subDetails:subDetailsReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    selectedSub: selectedSubReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const ItemFromStorage = localStorage.getItem('subItem') ?
    JSON.parse(localStorage.getItem('subItem')) : []

const initialState = {
    selectedSub:{ 
        subItem: ItemFromStorage},
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store

