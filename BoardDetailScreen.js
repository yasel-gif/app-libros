import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../firebasedb';

class BoardDetailScreen extends Component {
  
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Libros');
    this.state = {
      isLoading: true,
      board: {},
      key: ''
    };
  }
  
  componentDidMount() {
    const { route, navigation } = this.props;
    
    
    // obtener el documento utilizando route.params.boardkey
    id = route.params.boardkey;
    console.log(JSON.parse(id));
    let docRef = firebase.firestore().collection('Libros').doc(JSON.parse(id));

    docRef.get().then((doc) => {
      if(doc.exists){
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      }else{
        console.log("El documento no existe");
      }
    }).catch((error) => 
      {console.log(error);
    })
    
  }
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    // borrar el elemento utilizando el parametro key
    var referencia = firebase.firestore().collection('Libros').doc(key);
    referencia.delete()
    .then(()=>{
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Board');
    }).catch((error) =>{
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
    
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.board.titulo}</Text>
            </View>
            <View>
              <Text h5>{this.state.board.descripción}</Text>
            </View>
            <View>
              <Text h4>{this.state.board.autor}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
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
    paddingBottom: 20,
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
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})


export default BoardDetailScreen;