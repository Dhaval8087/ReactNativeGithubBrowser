import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
import AutheticationService from './AutheticationService';
import Feed from './feed';
import Search from './SearchForm'
export default class MainPage extends Component {

    constructor(props)
    {
        super(props);
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

                        <NavigatorIOS
                            style={{
                            flex: 1
                        }}
                            initialRoute={{
                            component: Feed,
                            title: 'Feed'
                        }}></NavigatorIOS>

                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        title='Search'
                        selected={this.state.selectedTab == 'Search'}
                        icon={require('./images/search.png')}
                        onPress={() => this.setState({selectedTab: 'Search'})}>

                        <NavigatorIOS
                            style={{
                            flex: 1
                        }}
                            initialRoute={{
                            component: Search,
                            title: 'Search'
                        }}></NavigatorIOS>

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