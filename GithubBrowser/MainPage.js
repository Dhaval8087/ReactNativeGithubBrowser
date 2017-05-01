import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TabBarIOS} from 'react-native';
import AutheticationService from './AutheticationService';
import Feed from './feed';
export default class MainPage extends Component {

    constructor()
    {
        super();
        this.state = {
            profileInfo: null,
            selectedTab: 'feed'
        }
    }
    componentDidMount()
    {
        AutheticationService.getAuthInfo('user', (value) => {
            
            this.setState({
                profileInfo: JSON.parse(value)
            });
        });
    }

    render()
    {
        let onLoggedOut = this.props.onLoggedOut;
        var profileName = '';
        if (this.state.profileInfo != null) {
            profileName = this.state.profileInfo.login;
        }
        return (
            <View style={mainStyles.maincontainer}>
                <Button style={mainStyles.logout} onPress={onLoggedOut} title="Logout"></Button>
                <TabBarIOS style={mainStyles.container}>
                    <TabBarIOS.Item
                        title='feed'
                        selected={this.state.selectedTab == 'feed'}
                        icon={require('./images/inbox.png')}
                        onPress={() => this.setState({selectedTab: 'feed'})}>

                        <Feed />
                    
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        title='Search'
                        selected={this.state.selectedTab == 'Search'}
                        icon={require('./images/search.png')}
                        onPress={() => this.setState({selectedTab: 'Search'})}>

                        <Text style={mainStyles.text}>Tab Search</Text>
                    
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>

        )
    }
}
const mainStyles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
        paddingTop: 10,
        padding: 10
    },
    maincontainer: {
        flex: 1,

        backgroundColor: '#F5FCFF',
        paddingTop: 30,
        padding: 10
    },
    text: {
        paddingTop: 40
    },

    logout: {
        flex: 1,
        fontSize: 30,
        paddingTop: 10,
        alignSelf: 'flex-end'
    }

});