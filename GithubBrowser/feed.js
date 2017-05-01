import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ListView,
    ActivityIndicator,
    TouchableHighlight,
    Image
} from 'react-native';
import AutheticationService from './AutheticationService';
import PushPayload from './PushPayload';
import moment from 'moment';

export default class Feed extends Component {

    constructor(props)
    {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['A', 'B', 'C']),
            isLoad: true
        };
    }
    componentDidMount()
    {

        this.fetchFeed();
    }
    fetchFeed()
    {
        AutheticationService.getAuthInfo('user', (value) => {

            var url = 'https://api.github.com/users/' + JSON
                .parse(value)
                .login + '/received_events';
            AutheticationService.getAuthInfo('auth', (value) => {
                fetch(url, {headers: value}).then((res) => res.json()).then((responseData) => {
                    var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
                    this.setState({
                        dataSource: this
                            .state
                            .dataSource
                            .cloneWithRows(feedItems),
                        isLoad: false

                    })
                })
            })
            //
        });

    }
    pressRow(rowData)
    {
       this.props.navigator.push({
          title:'Push Event',
          component:PushPayload,
           passProps:{
               PushEvent:rowData
           }
       });
    }
    renderRow(rowData)
    {
        return (
            <TouchableHighlight onPress={() => this.pressRow(rowData)} underlayColor='#ddd'>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1
                }}>
                    <Image
                        source={{
                        uri: rowData.actor.avatar_url
                    }}
                        style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18
                    }}/>
                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>{moment(rowData.created_at).fromNow()}</Text>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>{rowData.actor.login}
                            pushed to</Text>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>{rowData
                                .payload
                                .ref
                                .replace('refs/heads/', '')}</Text>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>at {rowData.repo.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render()
    {
        if (this.state.isLoad) {
            return (
                <View
                    style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator animating={true} size="large"></ActivityIndicator>
                </View>
            )
        } else {
            return (
                <View
                    style={{
                    flex: 1,
                    paddingTop:30,
                    justifyContent: 'flex-start'
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this
                        .renderRow
                        .bind(this)}></ListView>

                </View>
            );
        }

    }
}
