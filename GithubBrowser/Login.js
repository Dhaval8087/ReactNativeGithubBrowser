import React, {Component} from 'react';
import buffer from 'buffer';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import AutheticationService from './AutheticationService';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoad: false,
            badCredential: false
        }
    }
    componentWillUnmount()
    {
       
    }
    onLoginPressed() {
        this.setState({isLoad: true});

        var credential = this.state.username + ':' + this.state.password;
        var b = new buffer.Buffer(credential);
        var userName = this.state.username;
        var encodedAuth = b.toString('base64');
        
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            if (response.status == 401) {
                throw 'Bad credential';
            }
            
        }).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);
            AutheticationService.setAuthInfo(encodedAuth, result);
            this.props.onLogin(true);
           
        }).catch((err) => {
            this.setState({badCredential: true,isLoad:false});
           // alert('logon failed :' + err);
        }). finally(() => {
            //this.setState({isLoad: false});
        })
    }
    render() {
        var errorCtrl = <View/>
        if (this.state.badCredential) {
            errorCtrl = <Text style={loginStyles.error}>That username and password combination did not work</Text>
        }
        return (
            <View style={loginStyles.container}>
                <Image style={loginStyles.logo} source={require('./images/Octocat.png')}/>
                <Text style={loginStyles.welcome}>
                    Github browser
                </Text>
                <TextInput
                    style={loginStyles.input}
                    value={this.state.username}
                    placeholder="Github username"
                    onChangeText={(text) => {
                    this.setState({username: text});
                }}/>
                <TextInput
                    style={loginStyles.input}
                    value={this.state.password}
                    placeholder="Github password"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                    this.setState({password: text});
                }}/>
                <TouchableHighlight
                    style={loginStyles.button}
                    onPress={this
                    .onLoginPressed
                    .bind(this)}>
                    <Text style={loginStyles.buttonText}>
                        Log in
                    </Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicator
                    animating={this.state.isLoad}
                    size="large"
                    style={loginStyles.loader}></ActivityIndicator>
            </View>
        )

    }
}
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10
    },
    logo: {
        height: 44,
        width: 40
    },
    welcome: {
        fontSize: 30,
        paddingTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'

    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        marginTop: 10
    }

});