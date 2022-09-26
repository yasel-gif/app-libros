import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../firebasedb';


class BoardScreen extends Component {
  
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.ref = firebase.firestore().collection('Libros');
    
    this.state = {
      isLoading: true,
      boards: []
    };
  }

   onCollectionUpdate = dataSnapshot => {
    this.ref.get().then((snapShots) => {
      this.setState({
        boards: snapShots.docs.map(doc => {
          return{id: doc.id, data: doc.data()}
        }),
        isLoading: false
      })
    }, error => {
      console.log(error)
    });
  
  };
 
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);    
  }
  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>        
          {
            this.state.boards.map((item, i) => (
              <ListItem
                key={i}
                title={item.data.titulo}
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  console.log(item.id);
                  this.props.navigation.navigate('BoardDetails', {
                    boardkey: `${JSON.stringify(item.id)}`,
                  });
                }}
              />
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default BoardScreen;