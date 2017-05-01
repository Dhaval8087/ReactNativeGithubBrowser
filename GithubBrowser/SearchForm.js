import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import AutheticationService from './AutheticationService';
import SearchResults from './SearchResults';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery:'',
            isLoad: false
        }
    }
    componentWillUnmount()
    {
       
    }
    onSearchPressed() {
       // this.setState({isLoad: true});
       this.props.navigator.push({
           component:SearchResults,
           title:'Results',
           passProps:{
               searchQuery:this.state.searchQuery
           }
       })
    }
    render() {
        
        return (
            <View style={searchStyles.container}>
                <TextInput
                    style={searchStyles.input}
                    value={this.state.searchQuery}
                    placeholder="Search Query"
                    onChangeText={(text) => {
                    this.setState({searchQuery: text});
                }}/>
               
                <TouchableHighlight
                    style={searchStyles.button}
                    onPress={this
                    .onSearchPressed
                    .bind(this)}>
                    <Text style={searchStyles.buttonText}>
                        Search
                    </Text>
                </TouchableHighlight>
               
            </View>
        )

    }
}
const searchStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 100,
        padding: 10
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
    }
});