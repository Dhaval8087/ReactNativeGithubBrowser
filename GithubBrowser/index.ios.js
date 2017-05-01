/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Login from './Login';
import MainPage from './MainPage';
import AutheticationService from './AutheticationService';
export default class GithubBrowser extends Component {
  constructor()
  {
    super();
    this.state = {
      isLoggedIn: false,
      isLoad: true
    }
    this.onLogin=this.onLogin.bind(this);
    this.onLoggedOut=this.onLoggedOut.bind(this);
  }
  componentDidMount()
  {
    AutheticationService.getAuthInfo('auth', (value) => {
      console.log(value);
      if (typeof value != "undefined" && value != null) {
       
        this.state.isLoggedIn=true;

      } else {
        this.state.isLoggedIn=false;
      }
      this.setState({mainContent: this.state.mainContent, isLoggedIn: this.state.isLoggedIn});
    });
  }
  onLogin()
  {
    this.setState({isLoggedIn:true});
  }
  onLoggedOut()
  {
     AutheticationService.clearData();
    this.setState({isLoggedIn:false});
  }
  render() {
    if (this.state.isLoggedIn == false) {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
    else
    {
      return(
        <MainPage onLoggedOut={this.onLoggedOut}/>
      )
    }

  }
}
class LoaderComponent extends Component {
  render()
  {
    return (
      <View>
        <ActivityIndicator
          animating={this.props.isLoad}
          size="large"
          style={Styles.loader}></ActivityIndicator>
      </View>
    )
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    padding: 10
  },

  welcome: {
    fontSize: 30,
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});
AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
