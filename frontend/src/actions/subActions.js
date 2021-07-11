import axios from 'axios'
import {
    SUB_LIST_REQUEST,
    SUB_LIST_SUCCESS, 
    SUB_LIST_FAIL,

    SUB_DETAILS_REQUEST,
    SUB_DETAILS_SUCCESS,
    SUB_DETAILS_FAIL,

} from '../constants/subConstants'

export const listSubscriptions = () => async (dispatch) => {
    try {
        dispatch({ type: SUB_LIST_REQUEST })

        const { data } = await axios.get(`/api/subscriptions/`)

        dispatch({
            type: SUB_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUB_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSubscriptionsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUB_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/subscriptions/${id}`)

        dispatch({
            type: SUB_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUB_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
