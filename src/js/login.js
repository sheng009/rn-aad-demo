// import ReactNativeAD from './react-native-azure-ad/src';
// import ADLoginView from './react-native-azure-ad/src';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {ReactNativeAD, ADLoginView} from 'react-native-azure-ad'
import React from 'react';

const CLIENT_ID = '9280eee8-4c24-42ab-8c1d-4c19aac24a5c';

export class LandingView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
    this.AzureADContext = {
      client_id: CLIENT_ID,
      // Optional
      redirect_url: 'http://localhost:8080',
      // Optional
      authority_host: 'https://login.microsoftonline.com/common/oauth2/authorize',
      // authority_host: 'https://login.microsoftonline.com/06aa9b7a-f7ae-4e01-9581-a769e9fc1bd6/oauth2/authorize',
      
      // Optional
      tenant: 'common',
      // Optional
      prompt: 'none',
      // Optional
      login_hint: 'wangkun017@chinasofti.com',
      // This is required if client_id is a web application id
      // but not recommended doing this way.
      client_secret: 'MKj._ji2U_SZHa6MSm-z82~eiMgzY9PR4t',
      resources: [
        'https://graph.microsoft.com',
        'https://outlook.office.com',
        
        // ... more resources
      ]
    };
    fetch("https://login.windows.net/9280eee8-4c24-42ab-8c1d-4c19aac24a5c/oauth2/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    console.log("ReactNativeAD");
    new ReactNativeAD({
      client_id: CLIENT_ID,
      resources: [
        'https://outlook.office365.com'
      ]
    });
    console.log("ReactNativeAD done");
  }

  render() {
    return <View >
      <ADLoginView
      context={ReactNativeAD.getContext(CLIENT_ID)}
      needLogout={this.state.logout}
      onSuccess={this.onLoginSuccess.bind(this)} />
      <Button style={{flex:1,width:50,height:200}} onPress={(e) => this.logout()} title="logout"/>
    </View>
  }

  logout(e){
    this.setState({
      logout:true
    });
  }

  onLoginSuccess(cred) {
    console.log(cred)
  }

}