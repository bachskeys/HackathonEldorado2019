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
  Dimensions,Picker
} from 'react-native';
import Dropdown from '../components/Dropdown';
import { Fonts, Colors } from '../constants';
import { TextInput, Button } from '../components';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { AppLoading, Font } from 'expo';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

const products =
  [
      {
          "category": "hortaliza", 
          "product":"zanahoria", 
          "quantity": 10
      },
      {
          "category": "legumbre", 
          "product":"lentejas", 
          "quantity": 15
      }
  ];
  


export default class CrearOrden extends React.Component {
  state = {
    anim: new Animated.Value(0),
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
    isLoading:true,
    hack:0,
    cantidad:1
  };

  componentWillMount() {
  this.props.OrdenStateActions.resetOrdenState();
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
  _getWhereHouseAsync = async () =>{
    return await this.props.OrdenStateActions.getWhereHouse();
  }
  handleEmail = (e) =>{
    this.props.authStateActions.setEmail(e.nativeEvent.text)
  }
  handlePassword = (e) =>{
    this.props.authStateActions.setPassword(e.nativeEvent.text)
  }
_handleFinishLoading = () =>{
this.setState({isLoading:false})
}
_handleDestino = (e) =>{
this.props.OrdenStateActions.setDestino(e)
}
_handleCategory = (e) =>{
  switch(e){
    case "zanahoria":
    this.setState({hack:0})
    case "lentejas":
    this.setState({hack:1})
  }

}
crearOrdenAsyn = () =>{
   const{ordenState:{destino,category},authState}=this.props
   const {user:{response}}=authState
   const {id}=response;
   const catData = products.filter(item=> item.category===category)
   const whereHousesParse = JSON.parse(this.props.ordenState['whereHouses'])
   const wHData = whereHousesParse.filter(item=>item.name===destino);
  //  const shipmentContent ={category:catData[0].category,product:catData[0].product,quantity:this.state.cantidad}
   const postData = {shipment_content:this.state.hack,destiny_id:wHData[0].id,user_id:id,quantity:this.state.cantidad}
  //  shipment_content:shipmentContent

   let headers = { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

   let post = JSON.stringify(postData)
   console.log('looking out',post);
   fetch('https://shipment-monitoring.herokuapp.com/api/shipment/create',
   {method:"post",headers:headers,body:post}).then(res=>{
   let response = JSON.parse(res['_bodyInit'])
   console.log('debugging in CrearOrden',response);
   if(response.message==="Server Error"){
     console.log('errorrrr');
   }else{
     this.props.navigation.navigate('Ordenes',{folio:response.folio})
   }
  })

}
handleCantidad = (e) =>{
  console.log('debugging cantidad',e.nativeEvent.text);
  let cantidad =parseInt(e.nativeEvent.text)
  this.setState({cantidad},()=>{console.log('hi',this.state);})
}


  render() {
   const {ordenState,authState}=this.props
   const {isLoading}=this.state;
   const whereHousesObject = ordenState?JSON.parse(ordenState.whereHouses):null
   const {user:{response}}=authState
  //  const {id}=response;


 


    const loading = <AppLoading  
                      startAsync={this._getWhereHouseAsync}
                      onError={this._handleLoadingError}
                      onFinish={this._handleFinishLoading}/>;


    const doneLoading = <View style={[styles.container, { paddingBottom: this.state.isKeyboardVisible ? 220 : 0 }]}>
    <View style={styles.backgroundImage}>
     <View style={[styles.section, { paddingTop: 10 }]}>
       <Animated.Image
         resizeMode="contain"
         style={[styles.logo, this.state.isKeyboardVisible && { height: 90 }, this.fadeIn(0)]}
         source={require('../../assets/images/icons8-deliver-food-96.png')}
       /> 
     </View>
 
     <Animated.View style={[styles.section, styles.middle, this.fadeIn(700, -20)]}>
     <View style={styles.middle}>
     <Text style={{marginRight:20,textAlign:'center'}}>Seleccione el Destino</Text>
     <View style={styles2.row}>
   
       <Picker
       selectedValue={this.state.selectedDestino}
       style={{height: 50, width: 400,marginLeft:120,borderColor:'white',color:'white'}}
       onValueChange={(item)=>{ this._handleDestino(item), this.setState({selectedDestino:item})}
   }>
   {whereHousesObject.map(item=><Picker.Item label={item.name} value={item.name} />)}
     </Picker>
      </View>
      <Text style={{marginLeft:30}}>Seleccione la categoria de el producto a enviar</Text>
     <View style={styles2.row}>
   
       <Picker
       selectedValue={this.state.selectedCategory}
       style={{height: 50, width: 400,marginLeft:120,borderColor:'white',color:'white'}}
       onValueChange={(item)=>{this._handleCategory(item),this.setState({selectedCategory:item})}}>
       {products.map(item=><Picker.Item label={item.product} value={item.product} />)}
     </Picker>
     
     

      </View>
     
      </View>
      <View style={{width:150,textAlign:'center'}}>
      <TextInput style={{textAlign:'center'}}
        textBreakStrategy='simple'
        placeholder="cantidad"
        keyboardType='numeric'
        onChange={this.handleCantidad}
      />
      </View>
 
       <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
         <Button
           rounded
           secondary
           style={{ alignSelf: 'stretch', marginBottom: 10 }}
           caption={ 'Crear orden' }
           onPress={this.crearOrdenAsyn }
         />
 
     
 
       </Animated.View>
     </Animated.View>
     </View>
 </View>;                  


    return (
  isLoading?loading:doneLoading
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
    paddingHorizontal: 10,
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 80,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 10,
    paddingVertical: 20,
    borderColor: '#383A40',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: '#383A40',
    fontFamily: Fonts.primary,
    textAlign: 'center'
  },
  itemImage: {
    height: 35,
  },
});
