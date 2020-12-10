import React, { Component } from 'react';

import { StyleSheet, View, Keyboard, ActivityIndicator, StatusBar, Button, } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../database/fbConfig';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errorMessage: ''
    }
  }

  static navigationOptions = {
    headerMode: 'none'
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {

    if (this.state.email.length == 0) {
      alert('Missing email!');
      return;
    }

    if (this.state.password.length == 0) {
      alert('Missing Password!');
      return;
    }
    try {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Dashboard'))
        .catch(error => {
          alert(error.message);
        })
        console.log(this.state)
    } catch (err) {
      alert(err);
    }
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }

    return (

      <View>
        <StatusBar hidden={true} />
        <View style={styles.container}>

          <View style={styles.formViewContainer}>
            <TextInput
              placeholder="Email"
              keyboardType={"email-address"}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
              style={styles.inputText}
            />
            <TextInput
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
              style={styles.inputText}
            />

            <Button
              title="Login"
              style={{ marginTop: 30, backgroundColor: 'orange' }}
              full
              rounded
              primary
              onPress={() => this.userLogin()}
              style={styles.btn}
            />
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  formViewContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100
  },

  inputText:{
    marginTop:10
  },

  inputText:{
    marginBottom:10
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});