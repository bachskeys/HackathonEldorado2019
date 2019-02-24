import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
const hederBackground = require('../../assets/images/topBarBg.png');


 const LogOutBtn = ({ props }) => {
  
          return {
              title: 'LogOut',
              headerLeft: null,
              headerBackground: (
                  <Image
                      style={{ flex: 1 }}
                      source={hederBackground}
                      resizeMode="cover"
                  />
              ),
          };
      }


      export default LogOutBtn;