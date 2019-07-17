import * as types from "../../constants/ActionType";


const initState = {
    users: [],
    error: null,
    pending: false

}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_USERS_PENDING:
            return {
                ...state,
              
                pending: true
            }
        case types.FETCH_USERS_SUCCESS:
            return {
                ...state,
         
                pending: false,
                users: action.payload
            }
        case types.FETCH_USERS_ERROR:
           return{
            ...state,
           
            pending: false,
            error: action.error
        }
       
        
            default:
                    return state;
        
}
}

export default userReducer;