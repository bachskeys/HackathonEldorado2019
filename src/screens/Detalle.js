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
  ScrollView,Picker
} from 'react-native';


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
    data:[],
    shipment_id:0,
  };

 async componentWillMount() {
   const {navFolio} = this.props.navigation.state.params;
   const toFilterArray=this.props.ordenState.allOrders;
 
   const FilteredArray=toFilterArray[0].filter((item)=>{
    //   console.log('comparing',navFolio,'',item)
       return item.folio===navFolio
    });
    this.setState({detalle:FilteredArray[0]},()=>{

        this.setState({shipment_id:this.state.detalle.id})
    })
    await fetch('https://shipment-monitoring.herokuapp.com/api/shippment/drivers-devices/available')
    .then(res=>{console.log('response in redux',res['_bodyInit'])
    let response=JSON.parse(res['_bodyInit']);
        this.setState({drivers:response.drivers,devices:response.devices},()=>{
            this.setState({driver_id:this.state.drivers[0].id,device_id:this.state.devices[0].id})
        })
        
    })
    console.log('Checking the props in detail',FilteredArray[0]);
    console.log('checking state int component wil unmount',this.state);
  }

  _handleDriver = (item) =>{
    this.setState({driver_id:item},()=>{
        console.log('checking for state changes',this.state.driver_id);
    })
  }
  _handleDevice = (item) =>{
    this.setState({device_id:item},()=>{
        console.log('checking for state changes',this.state.device_id);
    })
      }

_handleDespacho = () =>{
    let headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      let data = {
          shipment_id:this.state.shipment_id,
          driver_id:this.state.driver_id,
          device_id:this.state.device_id
      }
      let postData = JSON.stringify(data)
      console.log('looking up',data);
       fetch('https://shipment-monitoring.herokuapp.com/api/shipment/update/state/departure',
      {method:"POST",headers:headers,body:postData})
      .then(res=>{console.log('response in redux',res['_bodyInit'])
     this.props.navigation.navigate('OrdenesActivas')
    })
    
     
}
     
 
  render() {

  const shipment = JSON.parse(this.state.detalle.shipment_content);

    return (

<View style={[styles.container]} >
    <Text style={{marginTop:50,fontSize:30}}>{`Embarque ${this.state.detalle.folio}`}</Text>
    <View style={styles2.row}>
        <View style={styles2.item}>
        <Text>Origen</Text>
        </View>
        <View style={styles2.item}>
        <Text>Destino</Text>
        </View>
    </View>
    <View style={styles2.row}>
        <View style={styles2.item2}>
            <Text>{this.state.detalle.agent_location}</Text>
        </View>
        <View style={styles2.item2}>
            <Text  >{this.state.detalle.wherehouse}</Text>
        </View>
    </View>
    <View style={styles2.row}>
    <View style={styles2.item3}><Text>Tipo de Carga</Text></View>
    <View style={styles2.item3}><Text>{shipment.category}</Text></View>
    </View>
    <View style={styles2.row}>
    <View style={styles2.item3}><Text>Producto</Text></View>
    <View style={styles2.item3}><Text>{shipment.product}</Text></View>
    </View>
    <View style={styles2.row}>
    <View style={styles2.item3}><Text>Cantidad</Text></View>
    <View style={styles2.item3}><Text>{shipment.quantity}</Text></View>
    </View>
    <View >
    <Text style={{marginLeft:200,marginTop:30}}>Seleccione a un chofer</Text>
    <Picker
       selectedValue={this.state.selectedDriver}
       style={{height: 50, width: 400,marginLeft:120,borderColor:'black',color:'black'}}
       onValueChange={(item)=>{this._handleDriver(item) 
        this.setState({selectedDriver:item})}}
    >
       {this.state.drivers?this.state.drivers.map(item=><Picker.Item label={item.name} value={item.id} />):null}
     </Picker>
     </View>
     <View >
    <Text style={{marginLeft:200,marginTop:30}}>Seleccione a un dispositivo</Text>
    <Picker
       selectedValue={this.state.selectedDevice}
       style={{height: 50, width: 400,marginLeft:120,borderColor:'black',color:'black'}}
       onValueChange={(item)=>{this._handleDevice(item) 
        this.setState({selectedDevice:item})}}
    >
       {this.state.devices?this.state.devices.map(item=><Picker.Item label={item.device_name} value={item.id} />):null}
     </Picker>
     </View>
     <Button
          rounded
          secondary
          style={{  marginTop: 10 }}
          caption={ 'Despachar' }
          onPress={this._handleDespacho}
        
        />

</View>

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
    item2: {
        flex: 1,
        height: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor:"white",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,
      },
      item3: {
        flex: 2,
        height: 10,
        borderWidth: 1,
        borderColor:"white",
        borderRadius: 5,
        alignItems: 'center',
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
