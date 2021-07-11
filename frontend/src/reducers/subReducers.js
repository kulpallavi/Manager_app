import {
    SUB_LIST_REQUEST,
    SUB_LIST_SUCCESS, 
    SUB_LIST_FAIL,

    SUB_DETAILS_REQUEST,
    SUB_DETAILS_SUCCESS,
    SUB_DETAILS_FAIL,
} from '../constants/subConstants'

export const subListReducer = (state = { subscriptions: [] }, action) => {
    switch (action.type) {
        case SUB_LIST_REQUEST:
            return { loading: true, subscriptions: [] }

        case SUB_LIST_SUCCESS:
            return {
                loading: false, subscriptions: action.payload
            }

        case SUB_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const subDetailsReducer = (state = { subscription: [] }, action) => {
    switch (action.type) {
        case SUB_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SUB_DETAILS_SUCCESS:
            return {
                loading: false,
                subscription: action.payload
            }

        case SUB_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}















