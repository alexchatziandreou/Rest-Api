import { ACTION_TYPES } from "../actions/Categories";

const initialState1 = {
    list: []
}
export const Categories = (state1 = initialState1, action1) => {
    switch (action1.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state1,
                list: [...action1.payload]
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state1,
                list: [...state1.list, action1.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state1,
                list: state1.list.map(x => x._id == action1.payload._id ? action1.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state1,
                list:state1.list.filter(x => x._id != action1.payload)
            }

        default:
            return state1;
    }
}
