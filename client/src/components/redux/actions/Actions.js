import { NAVBAR } from './Types'

export const showNavbar = (items) => {
    return {
        type: NAVBAR,
        payload: items
    }
}