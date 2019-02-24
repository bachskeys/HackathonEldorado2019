import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import moment from 'moment';

import HomeScreen from '../screens/HomeScreen';

export default compose(
  connect(
    state => ({
      authState: state.auth,
      navigatorState: state.navigation,
    }),
  ),
  withState('isExtended', 'setIsExtended', false),
)(HomeScreen);
