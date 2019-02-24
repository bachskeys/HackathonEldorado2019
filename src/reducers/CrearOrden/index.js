

// Initial state
const initialState = {
 whereHouses:'here are the where house',
 destino:'Tijuana',
 category:'hortaliza',
 allOrders:{},
 navFolio:''

};

// Actions
const SET_DESTINO = 'AuthState/SET_DESTINO';
const SET_CATEGORY = 'AuthState/SET_CATEGORY'
const GET_WHEREHOUSE = 'AuthState/GET_WHEREHOUSE';
const RESET_ORDEN_STATE = 'AuthState/RESET_ORDEN_STATE';
const GET_ALL_ORDERS = 'AuthState/GET_ALL_ORDERS';
const SET_NAV_FOLIO = 'AuthState/SET_NAV_FOLIO'
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
export function getAllOrders(response){
  return{
    type:GET_ALL_ORDERS,
    response

  }
}
export function setNavFolio(folio){
  return{
    type:SET_NAV_FOLIO,
    folio

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
case GET_ALL_ORDERS:
return Object.assign({}, state, {
  allOrders:action.response
  });
  case SET_NAV_FOLIO:
  return Object.assign({}, state, {
    navFolio:action.folio
    });
    default:
      return state;
  }
}
