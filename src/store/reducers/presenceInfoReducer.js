import * as types from "../../constants/ActionType";

const initState = {
    varStatus: null,
    permaStatus:null,
    activity: null,
    error: null,
    pending: false

}

const prsenceInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_PRESENCE_INFO_PENDING:
            return {
                ...state,
              
                pending: true
            }
        case types.FETCH_ACCOUNT_SESSIONS_SUCCESS:
            return {
                ...state,
         
                pending: false,
                varStatus: action.result.varStatus,
                permaStatus: action.result.permaStatus,
                activity: action.result.activity,
    
            }
        case types.FETCH_ACCOUNT_SESSIONS_ERROR:
           return{
            ...state,
           
            pending: false,
            error: action.error
        }

        
    
        
            default:
                    return state;
        
}
}

export default prsenceInfoReducer;