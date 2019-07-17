import * as types from "../constants/ActionType";
import axios from 'axios';




export function fetchTracersPending() {
  return {
    type: types.FETCH_TRACERS_PENDING,
    
  };
}

export function fetchTracersSuccess(messages, errors, accountId) {
  console.log(messages);
 
    return {
      type: types.FETCH_TRACERS_SUCCESS,
      messages, 
      errors, 
      accountId ,
     
    }; 
  }

  export function fetchTracersError(error) {
    console.log(error);
      return {
        type: types.FETCH_TRACERS_ERROR,
        error
        
      };
    }






 export function fetchTracers(query){
        return (dispatch) =>{
          dispatch(fetchTracersPending());
            axios.get("http://10.7.8.129:9003/search?query="+ query)
            .then((result) =>{  
              setTimeout(() => {
                   var  array = result.data;
                    console.log(array);
                    var arrayObj = [];
                    var errors = [];
                    var messages = [];
                    array.map(item =>{
                      let rawPayload = item.payload.replace("", "");
                      let payload = JSON.parse(rawPayload);
                     
                      const newItem = {
                        ts: `${new Date(item.ts).getHours().toString()}:${new Date(item.ts).getMinutes().toString()}:${new Date(item.ts).getSeconds().toString()}`,
                        account_id: item.account_id,
                        session_id: item.session_id,
                        response: {"id": null},
                        request: {"id": null},
                      };
                      if(payload.params !== undefined){
                        const index = arrayObj.map(e => e.response.id).indexOf(payload.id);
                        newItem.request = payload;
                        if (index < 0){
                          arrayObj.push(newItem);
                        }else{
                          arrayObj[index].request = payload
                        }
                      }else{
                        const index = arrayObj.map(e => e.request.id).indexOf(payload.id);
                        newItem.response = payload;
                        if (index < 0){
                          arrayObj.push(newItem);
                        }else{
                          arrayObj[index].response = payload
                        }
                      
                      }
                      return true;
                    });   
                    var accountId = "";
          
                    arrayObj.map((val, key)=>{
                       if(val.response.error !== undefined){
                           errors.push(val)
                          accountId = val.account_id
                        }else if(val.response.result !== undefined) {
                            messages.push(val)
                        } 
                        return true;
                    
                  })
                  
                  dispatch(fetchTracersSuccess(messages, errors, accountId))
               
                  
                  
                }, 700);
                } ,
                (error) => {
                  dispatch(fetchTracersError(error))
                }
              )        
      }
     
      }
