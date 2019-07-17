import * as types from "../constants/ActionType";
import axios from 'axios';

export function fetchUsersPending() {
    return {
      type: types.FETCH_USERS_PENDING,
      
    };
  }

  export function fetchUsersSuccess(users) {
    console.log(users);
      return {
        type: types.FETCH_USERS_SUCCESS,
        payload: users
        
      };
    }

    export function fetchUsersError(error) {
      console.log(error);
        return {
          type: types.FETCH_USERS_ERROR,
          error
          
        };
      }

      



export function fetchUsers(params){

    return (dispatch) =>{
      
      dispatch(fetchUsersPending());
        axios.get("http://10.7.8.129:9002/search/user?", {
            params:{
            search: params.search, 
            type: params.type

            }}).then((result) =>{  
              
            
                  dispatch(fetchUsersSuccess(result.data.result.accounts))
              
                
              },
              (error) => {
                console.log("error", error)
                dispatch(fetchUsersError(error));
              }
            )        
    }
   
    }


    
  


