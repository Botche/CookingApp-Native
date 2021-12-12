import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { firebase } from '@react-native-firebase/database';

export default function App() {
  let [value, setValue] = useState('');

  useEffect(() => {
    console.log('Test');
    firebase
      .app()
      .database('https://cooking-app-native-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('users/123')
      .once('value')
      .then(snapshot => {
        setValue(snapshot.val()); 
      });
  }, [value]);

  return (
    <View style={styles.container}>
      <Text>{value}</Text> 
      <Text>Test</Text>
      <StatusBar style="auto" />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
