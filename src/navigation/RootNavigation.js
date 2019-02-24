import React from 'react';
import { Image, TouchableOpacity,View,Text,StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator,createSwitchNavigator } from 'react-navigation';


import MainTabNavigator from './MainTabNavigator';



import LogOutBtn from '../components/LogOutBtn';


import AuthScreen from '../containers/AuthScreen';

import { Colors, Fonts } from '../constants';
import CrearOrden from '../containers/CrearOrdenScreen';
import Detalle from '../containers/Detalle';;
import WebViewComponent from '../containers/WebView';

const headerBackground = require('../../assets/images/Landscape.png');

const styles = StyleSheet.create({
    tabBarItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.white,
        paddingHorizontal: 10,
    },
    tabBarIcon: {
        width: 23,
        height: 23,
    },
    tabBarIconFocused: {
        tintColor: Colors.primary,
    },
    headerContainer: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    headerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
    },
    headerCaption: {
        fontFamily: Fonts.primaryRegular,
        color: Colors.white,
        fontSize: 18,
    },
});




const auth = createStackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
            navigationOptions: ({ navigation }) => {
                return {
                    title: 'Embarques',
                    headerLeft: null,
                    headerBackground: (
                        <View style={{backgroundColor:'#383A40',height:80}}><Text style={{color:'white'}}>Embarques</Text></View>
                    ),
                };
            },         
        },
        CrearOrden: {
            screen: CrearOrden,
            navigationOptions: {
                header: null,
            },
        },
        Detalle: {
            screen: Detalle,
            navigationOptions: {
                header: null,
            },
        },
        WebView: {
            screen: WebViewComponent,
            navigationOptions: {
                header: null,
            },
        },
        // Ga
        // Gallery: {
        //     screen: GalleryScreen,
        //     navigationOptions: {
        //         title: 'Gallery',
        //     },
        // },
        // Article: {
        //     screen: AvailableInFullVersion,
        //     navigationOptions: {
        //         header: null,
        //     },
        // },
        // Chat: {
        //     screen: AvailableInFullVersion,
        //     navigationOptions: {
        //         header: null,
        //     },
        // },
        // Messages: {
        //     screen: AvailableInFullVersion,
        //     navigationOptions: {
        //         header: null,
        //     },
        // },
        // Charts: {
        //     screen: AvailableInFullVersion,
        //     navigationOptions: {
        //         header: null,
        //     },
        // },
    },
    {
        // defaultNavigationOptions: {title:'El dorito',header:<View style={{backgroundColor:'#383A40',height:80}}><Text style={{color:'white'}}>Embarques</Text></View>}
        defaultNavigationOptions: ({ navigation }) => {
            return {
                titleStyle: {
                    fontFamily: Fonts.primaryLight,
                },
                headerStyle: {
                    backgroundColor: '#383A40',
                    borderBottomWidth: 0,
                },
                headerBackground: (
                    <Image
                        style={{ flex: 1 }}
                        source={headerBackground}
                        resizeMode="cover"
                    />
                ),
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: Fonts.primaryRegular,
                },
                headerTintColor: '#222222',
                headerLeft: props => (
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={{
                            paddingLeft: 25,
                        }}
                    >
                        <View style={{backgroundColor:'#383A40',height:80}}><Text style={{color:'white'}}>Embarques</Text></View>
                    </TouchableOpacity>
                ),
            };
        },

    },
);

const noneAuthStack = createStackNavigator({
    Main: {
        screen: AuthScreen,
        navigationOptions: {header: null,}
    },
})



const AuthMiddleware=createSwitchNavigator(
    {
      app:auth,
      notAuth:noneAuthStack
    }
)



export default createAppContainer(AuthMiddleware);
