import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { Fonts, Colors } from '../constants';
import { TextInput, Button } from '../components';
import axios from 'axios';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class AuthScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

  componentWillMount() {
    this.props.authStateActions.resetState();
    this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }
  _logIn = async () =>{
    let {authState:{email,password}}=this.props;
    this.props.authStateActions.logInAsync({email,password});
    this.props.navigation.navigate('app');
  }
  _logOut = () =>{

    this.props.authStateActions.loggedOut();
  }

  handleEmail = (e) =>{

    this.props.authStateActions.setEmail(e.nativeEvent.text)
  }

  handlePassword = (e) =>{

    this.props.authStateActions.setPassword(e.nativeEvent.text)
  }

  render() {
    const TopComponent = Platform.select({ ios: KeyboardAvoidingView, android: View });
    const isRegister = this.state.formState === FORM_STATES.REGISTER;
    const {authState:{isLoggedIn,email,password,user}} = this.props;
    this.props.navigation.navigate(isLoggedIn?'app':'notAuth');
    console.log('show me the user nigga bitch asshole motherfucker',user);
    const isAuthView =  <View style={[styles.container, { paddingBottom: this.state.isKeyboardVisible ? 220 : 0 }]}>
   
     <View style={styles.backgroundImage}>
      <View style={[styles.section, { paddingTop: 30 }]}>
        <Animated.Image
          resizeMode="contain"
          style={[styles.logo, this.state.isKeyboardVisible && { height: 90 }, this.fadeIn(0)]}
          source={require('../../assets/images/icons8-deliver-food-96.png')}
        /> 
      </View>

      <Animated.View style={[styles.section, styles.middle, this.fadeIn(700, -20)]}>
       

        <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
          <Button
            secondary
            rounded
            style={{ alignSelf: 'stretch', marginBottom: 10 }}
            caption={ 'Log Out' }
            onPress={this._logOut }
          />

      

          { !this.state.isKeyboardVisible && (
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.spring();
              this.setState({ formState: isRegister ? FORM_STATES.LOGIN : FORM_STATES.REGISTER });
            }}
            style={{ paddingTop: 30, flexDirection: 'row' }}
          >
            <Text style={{ color: Colors.white, fontFamily: Fonts.primaryRegular }}>{isRegister ? 'Already have an account?' : 'Don\'t have an account?' }</Text>
            <Text style={{ color: Colors.white, fontFamily: Fonts.primaryBold, marginLeft: 5 }}>{isRegister ? 'Login' : 'Register' }</Text>
          </TouchableOpacity>
        )}
        </Animated.View>
      </Animated.View>
      </View>
  </View>;
  const isNotAuthView =  <View style={[styles.container, { paddingBottom: this.state.isKeyboardVisible ? 220 : 0 }]}>
   <View style={styles.backgroundImage}>
    <View style={[styles.section, { paddingTop: 30 }]}>
      <Animated.Image
        resizeMode="contain"
        style={[styles.logo, this.state.isKeyboardVisible && { height: 90 }, this.fadeIn(0)]}
        source={require('../../assets/images/icons8-deliver-food-96.png')}
      /> 
    </View>

    <Animated.View style={[styles.section, styles.middle, this.fadeIn(700, -20)]}>
      <TextInput
        placeholder="Username"
        value={email}
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        onChange={this.handleEmail}
      />     

      <TextInput
        placeholder="Password"
        name='password'
        value={password}
        secureTextEntry
        style={styles.textInput}
        onChange={this.handlePassword}
      />

      <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
        <Button
          rounded
          secondary
          style={{ alignSelf: 'stretch', marginBottom: 10 }}
          caption={ 'Login' }
          onPress={this._logIn }
        />

    

        { !this.state.isKeyboardVisible && (
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.spring();
            this.setState({ formState: isRegister ? FORM_STATES.LOGIN : FORM_STATES.REGISTER });
          }}
          style={{ paddingTop: 30, flexDirection: 'row' }}
        >
          <Text style={{ color: Colors.white, fontFamily: Fonts.primaryRegular }}>{isRegister ? 'Already have an account?' : 'Don\'t have an account?' }</Text>
          <Text style={{ color: Colors.white, fontFamily: Fonts.primaryBold, marginLeft: 5 }}>{isRegister ? 'Login' : 'Register' }</Text>
        </TouchableOpacity>
      )}
      </Animated.View>
    </Animated.View>
    </View>
</View>;



    return (
     isLoggedIn?isAuthView:isNotAuthView
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
    backgroundColor:'#383A40'
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  logo: {
    height: 150,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});
