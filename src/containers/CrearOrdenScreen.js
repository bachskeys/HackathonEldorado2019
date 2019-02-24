import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';


import * as OrdenStateActions from '../reducers/CrearOrden';
import CrearOrden from '../screens/CrearOrdenScreen';



const mapStateToProps =state => ({
 ordenState:state.orden,
 authState:state.auth
})

const mapDispatch = dispatch => ({
  OrdenStateActions: bindActionCreators(OrdenStateActions, dispatch),
})

export default 
  connect(
    mapStateToProps, 
    mapDispatch,
  )
(CrearOrden);
