import { CHANGE_FILTER } from '../actionTypes/index'

const initState: string = 'ALL';
const activeFilter = (state: string = initState, action: { type: string, payload: string }) => {
    switch (action.type) {
        case CHANGE_FILTER:
            return action.payload;

        default:
            return state;
    }
};

export default activeFilter;