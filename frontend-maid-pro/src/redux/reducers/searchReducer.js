import { searchQuickTypes, maidIdTypes } from "../actions/types"

function searchQuickReducer(currentUser = initialState(), action) {
        switch (action.type) {
            case searchQuickTypes.SEARCH_HOME:
                return {
                    ...action.payload
                };
            case searchQuickTypes.SEARCH_CONDO:
                return {
                    ...action.payload
                };
            default:
                return currentUser;
        }
    }

export default searchQuickReducer;

function maidIdReducer(currentUser = initialState(), action) {
    switch (action.type) {
        case maidIdTypes.MAID_ID:
            return {
                ...action.payload
            };
        default:
            return currentUser;
    }
}

export default maidIdReducer;
