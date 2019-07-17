import * as types from "../../constants/ActionType";


const initState = {
    metaArray: [],
    pushArray:[],
    sockets: [],
    blockList: [],
    opts:[],
    error: null,
    pending: false

}

const sessionReducer = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_ACCOUNT_SESSIONS_PENDING:
            return {
                ...state,
              
                pending: true
            }
        case types.FETCH_ACCOUNT_SESSIONS_SUCCESS:
            return {
                ...state,
         
                pending: false,
                metaArray: action.result.meta,
                blockList: action.result.blocklist,
                pushArray: action.result.push,
                sockets: action.result.sockets,
                opts: action.result.opts
            }
        case types.FETCH_ACCOUNT_SESSIONS_ERROR:
           return{
            ...state,
           
            pending: false,
            error: action.error
        }

        case types.UPDATE_TRACING:
                let opts = [...state.opts];

                opts[action.params.index] = {...opts[action.params.ndex], tracing: action.params.tracing};
                console.log(opts)
                
           return{
            ...state,
            opts
        }
    
        
            default:
                    return state;
        
}
}

export default sessionReducer;