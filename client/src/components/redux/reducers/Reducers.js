import { NAVBAR } from '../actions/Types'

const initialState = {
    menu: false
}

const userReducers = ( state = initialState, action ) => {
    switch (action.type) {
        case NAVBAR:
            return {
                ...state,
                menu: action.payload
            }

        default:
            return state
    }
}

export default userReducers