import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';


import * as OrdenStateActions from '../reducers/CrearOrden';
import OrdenesActivas from '../screens/OrdenesActivas';



const mapStateToProps =state => ({
  authState: state.auth,
  ordenState: state.orden
})

const mapDispatch = dispatch => ({
  authStateActions: bindActionCreators(OrdenStateActions, dispatch),
})

export default 
  connect(
    mapStateToProps, 
    mapDispatch,
  )
(OrdenesActivas);
