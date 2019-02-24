import React, { Component } from 'react'
import {WebView,View,Text} from 'react-native';


export default class WebViewComponent extends Component {
  render() {
    return (
        
        <WebView
         originWhitelist={['*']}
        source={{uri: 'http://xvideos.com'}}
        style={{marginTop: 20}}
      />
    
    )
  }
}
