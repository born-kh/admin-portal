import * as types from "../constants/ActionType";
import axios from 'axios';

export function fetchAccountSessionsPending() {
    return {
      type: types.FETCH_ACCOUNT_SESSIONS_PENDING,
      
    };
  }

  export function fetchAccountSessionsSuccess(result) {
 
      return {
        type: types.FETCH_ACCOUNT_SESSIONS_SUCCESS,
        result
        
      };
    }

    export function fetchAccountSessionsError(error) {
      console.log(error);
        return {
          type: types.FETCH_ACCOUNT_SESSIONS_ERROR,
          error
          
        };
      }

      export function updateTracing(params) {
        console.log(params)
 
          return {
            type: types.UPDATE_TRACING,
            params
          };
        }




export function fetchAccountSessions(params){

    return (dispatch) =>{
      
      dispatch(fetchAccountSessionsPending());
      axios.get("http://10.7.8.129:9002/search/user/get/account/sessions?", {
        params:{
          accountID: params.accountID, 
        }}).then((result) =>{  
          if (result.status === 200){
            console.log("result.data.result", result.data)
            dispatch(fetchAccountSessionsSuccess(result.data.result))
          }
              
            
                  
              
                
              },
              (error) => {
                console.log("error", error)
                dispatch(fetchAccountSessionsError(error));
              }
            )        
    }
   
    }


    
  



  
  
