import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';


import * as AuthStateActions from '../reducers/auth';
import Detalle from '../screens/Detalle';



const mapStateToProps =state => ({
  authState: state.auth,
  ordenState: state.orden,
})

const mapDispatch = dispatch => ({
  authStateActions: bindActionCreators(AuthStateActions, dispatch),
})

export default 
  connect(
    mapStateToProps, 
    mapDispatch,
  )
(Detalle);
