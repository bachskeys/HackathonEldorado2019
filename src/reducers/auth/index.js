import axios from 'axios';
import { NavigationActions } from 'react-navigation';

// Initial state
const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  hasPassedWalkthrough: false,
  hasPressedSingupButton: false,
  id: null,
  name: null,
  userToken: null,
  email:'',
  password:'',
  user:{}
};

// Actions
const SKIPPED_LOGIN = 'AuthState/SKIP';
const LOGGED_IN = 'AuthState/LOGGED_IN';
const SET_USER = 'AuthState/SET_USER';
const LOGGED_OUT = 'AuthState/LOGGED_OUT';
const SET_EMAIL = 'AuthState/SET_EMAIL';
const SET_PASSWORD = 'AuthState/SET_PASSWORD';
const RESET_STATE = 'AuthState/RESET_STATE';
const SET_APP_ON_LOGIN = 'AuthState/SET_APP_ON_LOGIN';
const LOG_IN_FAIL = 'AuthState/LOG_IN_FAIL';
export const logInAsync =  (userData) => async dispatch => {
const navigateToApp = NavigationActions.navigate({ routeName: 'Home'});
console.log('que rollo perra',userData);
let postData = JSON.stringify(userData)
let headers = { 
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
 fetch('https://shipment-monitoring.herokuapp.com/api/agent/login',
{method:"POST",headers:headers,body:postData})
.then(res=>{console.log('response in redux',res['_bodyInit'])
let resJson = JSON.parse(res['_bodyInit'])
if(resJson.msj==='Credenciales incorrectas'){

}else{
  dispatch({type:SET_USER,user:resJson})
}
})
.catch(e=>console.log('error',e))



}


export function resetState(){
  return{
    type:RESET_STATE
  }
}
export function loginFail(){
  return{
    type:LOG_IN_FAIL
  }
}
export function setAppOnLogIn(){
  return{
    type:SET_APP_ON_LOGIN
  }
}
// Action creators
export function loggedIn(userData) {
 return {
   type:LOGGED_IN,
   userData
 }
}

export function setEmail(email){
  return{
    type:SET_EMAIL,
    email
  }
}
export function setPassword(password){
  return{
    type:SET_PASSWORD,
    password
  }
}

export function skipLogin() {
  return {
    type: SKIPPED_LOGIN,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        hasPassedWalkthrough: state.hasPassedWalkthrough,
        isLoggedIn: true,
        id: action.data.id,
        name: action.data.name,
        userToken: action.data.userToken,
      });
    case SKIPPED_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        hasSkippedLogin: true,
        id: null,
        name: null,
        hasPassedWalkthrough: state.hasPassedWalkthrough,
      });
    case SET_USER:
      return Object.assign({}, state, {
        isLoggedIn: true,
         user:action.user
        
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      });
    case SET_EMAIL:
    return Object.assign({}, state, {
      email: action.email
    });
    case SET_PASSWORD:
    return Object.assign({}, state, {
      password: action.password
    });

    case RESET_STATE:
    return Object.assign({}, state, initialState)
    default:
      return state;
  }
}
