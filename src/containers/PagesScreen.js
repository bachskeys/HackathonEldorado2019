import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { NavigationActions } from 'react-navigation';

import * as AuthStateActions from '../reducers/auth';
import PagesScreen from '../screens/PagesScreen';
import asyncLogIn from '../reducers/auth';

export default compose(
  connect(
    state => ({
      authState: state.auth,
      navigatorState: state.navigation,
    }),
    dispatch => ({
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    }),
    
  ),
)(PagesScreen);
