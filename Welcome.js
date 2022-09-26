import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class Welcome extends Component {
 
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Libros');

    this.state = {
      key: '',
      isLoading: true,
      title: '',
      description: '',
      author: ''
    };
  }
  



  render() {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{uri: 'http://encuadernacionesruiz.com/web/wp-content/uploads/2015/06/icono-home-servicios-encuadernacion-gris.png'}}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'update'}}
              title='Siguiente'
              onPress={() => this.props.navigation.navigate('Board')} />
          </View>
        </ScrollView>
      );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    left: 0,
    right: 0,
    alignSelf: "center",
  }
})


export default Welcome;