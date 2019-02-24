import React, { Component } from 'react'
import {WebView,View,Text} from 'react-native';


export default class WebViewComponent extends Component {
  render() {
    return (
        
        <WebView
         originWhitelist={['*']}
        source={{html: `
        <div><iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/1bc68c22-8c84-483b-8b1d-c81ec3d1d66f">
       <div></iframe>`}}
        style={{marginTop: 20}}
      />
    
    )
  }
}
