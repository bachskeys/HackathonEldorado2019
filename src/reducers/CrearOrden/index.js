

// Initial state
const initialState = {
 whereHouses:'here are the where house',
 destino:'Tijuana',
 category:'hortaliza',

};

// Actions
const SET_DESTINO = 'AuthState/SET_DESTINO';
const SET_CATEGORY = 'AuthState/SET_CATEGORY'
const GET_WHEREHOUSE = 'AuthState/GET_WHEREHOUSE';
const RESET_ORDEN_STATE = 'AuthState/RESET_ORDEN_STATE';
export const getWhereHouse =  () => async dispatch => {
console.log('que rollo perra');

 fetch('https://shipment-monitoring.herokuapp.com/api/wherehouse/get-all')
.then(res=>{console.log('response in redux',res['_bodyInit'])
    dispatch({type:GET_WHEREHOUSE,payload:res['_bodyInit']})
})
.catch(e=>console.log('error',e))



}


export function resetOrdenState(){
  return{
    type:RESET_ORDEN_STATE
  }
}

export function getWhereHouses(response){
  return{
    type:GET_WHEREHOUSE,
    response
  }
}
export function setDestino(destino){
    return{
      type:SET_DESTINO,
      destino
    }
  }
  export function setCategory(category){
    return{
      type:SET_CATEGORY,
      category
    }
  }



// Reducer
export default function CreateOrdenReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_WHEREHOUSE:
    return Object.assign({}, state, {
          whereHouses:action.payload
      });
   case SET_DESTINO:
   return Object.assign({}, state, {
    destino:action.destino
    });
case SET_CATEGORY:
return Object.assign({}, state, {
    category:action.category
    });
case RESET_ORDEN_STATE:
return Object.assign({}, state, {
    category:'hortaliza',destino:'Tijuana'
    });
    default:
      return state;
  }
}