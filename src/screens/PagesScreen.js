import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Entypo as Icon} from '@expo/vector-icons';
import {Colors, Fonts} from '../constants';

const crearOrdenIcon = require('../../assets/images/crearOrdenIcon.png');
const calendarIcon = require('../../assets/images/pages/calendar.png');
const chatIcon = require('../../assets/images/pages/chat.png');
const consultarOrdenesIcon = require('../../assets/images/consultarOrdenesIcon.png');
const sensorIcon = require('../../assets/images/sensor.png');
const goodShip = require('../../assets/images/good-ship.png');

export default function PagesScreen(props) {

const {navigation:{navigate},authState:{isLoggedIn}} = props
navigate(isLoggedIn?"app":'notAuth')
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({routeName: 'CrearOrden'})}
          style={styles.item}>
          <Image
            resizeMode="contain"
            source={crearOrdenIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Crear orden</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({routeName: 'WebView'})}
          style={styles.item}>
          <Image
            resizeMode="contain"
            source={sensorIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Consultar Dispositivo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({routeName: 'OrdenesActivas'})}
          style={styles.item}>
          <Image
            resizeMode="contain"
            source={goodShip}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Embarques Activos</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 120,
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
