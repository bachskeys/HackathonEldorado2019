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
  FlatList,
  ScrollView
} from 'react-native';
import Moment from 'moment';


import { Fonts, Colors } from '../constants';
import { TextInput, Button } from '../components';
import axios from 'axios';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class ConsultarOrdenes extends React.Component {
  state = {
    anim: new Animated.Value(0),
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
    data:[]
  };

 async componentWillMount() {
    return await this.loadDataAsync();
   
  }
  componentWillReceiveProps(prevProps){
      if(prevProps.navigation.state.params!==this.props.navigation.state.params){
          console.log('reRender');
          this.loadDataAsync();
      }

  }

  loadDataAsync = async () =>{
    await fetch('https://shipment-monitoring.herokuapp.com/api/shipment/get-all')
    .then(res=>{console.log('response in redux',res['_bodyInit'])
    let response=JSON.parse(res['_bodyInit']);
        this.setState({data:response})
        this.props.authStateActions.getAllOrders([response]);
    })
    .catch(e=>console.log('error',e))
  }
  handleButton = async (folio) =>{
  await this.props.authStateActions.setNavFolio(folio);    
  this.props.navigation.navigate('Detalle',{navFolio:folio})
  }

 
  render() {
 const{ordenState:{allOrders}}=this.props
 {this.loadDataAsync}
 

    return (
<ScrollView>

    <View style={[styles.container]} >
    <Text style={{fontSize: 18, marinTop:5}}>Embarques sin despachar</Text>
    {/* <View
        style={{
          alignSelf:'center',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: '60%'
        }}
      /> */}
 {this.state.data.map((item,key)=>{
return  <View>
        <Button
        style={{width: '80%', marginBottom: 0}}
        //rounded
        secondary
        style={styles.item}
        caption={item.folio+' - '+Moment(item.created_at).format('DD MMM HH:mm')}
        onPress={()=>this.handleButton(item.folio)}
        />
        </View>
 })}
        
    
    </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
    backgroundColor:'#383A40'
  },
  item: {
    marginTop:30
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
