// @flow
import { combineReducers } from 'redux';
import NavigationStateReducer from './navigation';
import CalendarReducer from './calendar';
import GridReducer from './grid';
// ## Generator Reducer Imports
import GalleryReducer from './gallery';
import AuthReducer from './auth';
import CrearOrdenReducer from './CrearOrden';

export default combineReducers({
  navigation: NavigationStateReducer,
  calendar: CalendarReducer,
  grid: GridReducer,
  orden:CrearOrdenReducer,
  gallery: GalleryReducer,
  auth: AuthReducer,
});
