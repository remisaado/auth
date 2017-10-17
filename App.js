import React, {Component} from "react";
import {View} from "react-native";
import firebase from "firebase";
import {Header, Button, Spinner} from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

class App extends Component {
  state = {loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBPeSUNaL_o_enJTzo9IGa8oru5FS9THIM",
      authDomain: "authentication-4b449.firebaseapp.com",
      databaseURL: "https://authentication-4b449.firebaseio.com",
      projectId: "authentication-4b449",
      storageBucket: "authentication-4b449.appspot.com",
      messagingSenderId: "821379944863"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user)
      {
        this.setState({loggedIn: true});
      }
      else
      {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn)
    {
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
