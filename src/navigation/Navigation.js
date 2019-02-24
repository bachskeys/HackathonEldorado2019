import React from 'react';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';

import AuthScreen from '../containers/AuthScreen';
import AppNavigator from './RootNavigation';
import MiddleWare from './middleWare';

export default function NavigatorView(props) {
 
        return <MiddleWare props={props} />;

        

}

NavigatorView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({}).isRequired,
};
