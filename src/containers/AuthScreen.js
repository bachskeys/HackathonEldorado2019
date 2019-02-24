import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';


import * as AuthStateActions from '../reducers/auth';
import AuthScreen from '../screens/AuthScreen';



const mapStateToProps =state => ({
  authState: state.auth,
  navigatorState: state.navigation,
})

const mapDispatch = dispatch => ({
  authStateActions: bindActionCreators(AuthStateActions, dispatch),
})

export default 
  connect(
    mapStateToProps, 
    mapDispatch,
  )
(AuthScreen);
