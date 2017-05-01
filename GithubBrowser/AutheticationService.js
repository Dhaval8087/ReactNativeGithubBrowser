import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';
const authKey = 'auth';
const userKey = 'user';
const userInfo = {};
function login(crds, cb) {

    var b = new buffer.Buffer(crds.username + ':' + crds.password);
    var encodedAuth = b.toString('base64');
    fetch('https://api.github.com/user', {
        headers: {
            'Authorization': 'basic ' + encodedAuth,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            console.log(response);
            return cb(response);
        }
        if (response.status == 401) {
            throw 'Bad credential';
        }
        throw 'Unknown error';
    }).then((response) => {
        return response.json();
    }).then((result) => {
        AsyncStorage.multiSet([
            [
                'auth', encodedAuth
            ],
            [
                'user', JSON.stringify(result)
            ]
        ], (err) => {
            if (err) 
                throw err;
            }
        )
        return cb({success: true});

    }).catch((err) => {
        return cb(err);
    }). finally(() => {
        //this.setState({isLoad: false});
    })
}
function setAuthInfo(encodedAuth, result) {
    AsyncStorage.setItem('auth', encodedAuth);
    AsyncStorage.setItem('user', JSON.stringify(result));

}
function getAuthInfo(key, callback) {
   
    if (typeof key != "undefined") {
        AsyncStorage
            .getItem(key)
            .then((val) => {
                callback(val);
            });
    }

}
function clearData()
{
    AsyncStorage.clear();
}
module.exports = {
    login: login,
    setAuthInfo: setAuthInfo,
    getAuthInfo: getAuthInfo,
    clearData:clearData
};