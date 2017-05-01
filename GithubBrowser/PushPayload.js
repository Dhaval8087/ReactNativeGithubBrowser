import React, {Component} from 'react';
import {Text, View, Button, Image, ListView,StyleSheet} from 'react-native';
import AutheticationService from './AutheticationService';
import moment from 'moment';
export default class PushPayload extends Component {

    constructor(props)
    {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.PushEvent.payload.commits),
            pushEvent: this.props.PushEvent
        }

    }
    componentDidMount()
    {
        console.log(this.props);
    }
    renderRow(rowData)
    {
        return (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                paddingTop: 20,
                paddingBottom: 20,
                padding: 10
            }}>
                <Text>{rowData
                        .sha
                        .substring(0, 6)}
                    - {rowData.message}</Text>
            </View>
        )
    }
    render()
    {

        return (
            <View
                style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image
                    source={{
                    uri: this.state.pushEvent.actor.avatar_url
                }}
                    style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60
                }}/>
                <Text>
                    {moment(this.state.pushEvent.created_at).fromNow()}
                </Text>
                <Text>
                    {this.state.pushEvent.actor.login} pushed to
                </Text>
                <Text style={Styles.fontbold}>
                    {this
                        .state
                        .pushEvent
                        .payload
                        .ref
                        .replace('refs/heads/', '')}
                </Text>
                <Text>
                    at {this.state.pushEvent.repo.name}
                </Text>
                <Text
                    style={{
                    paddingTop: 30,
                    fontSize: 20
                }}>
                    {this.state.pushEvent.payload.commits.length}
                    Commits
                </Text>
                <ListView
                    contentInset={{
                    top: -80
                }}
                    dataSource={this.state.dataSource}
                    renderRow={this
                    .renderRow
                    .bind(this)}/>
            </View>

        )
    }
}
const Styles = StyleSheet.create({
   fontbold:{
       fontWeight:'800',
       fontSize:16
   }

});