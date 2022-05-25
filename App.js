/* eslint-disable */
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerSensor from './components/Accelerometer/Accelerometer';
import GyroscopeSensor from './components/Gyroscope/Gyroscope';
import Magnetometer from './components/Magnetometer/Magnetometer'
import CreateCollection from './components/CreaetCollection/CreateCollection';
// import LocationComponent from './components/Location/LocationComponent'

export default function App() {
  const [newCollection, setNewCollection] = useState({});
  return (
    <View style={styles.container}>
      <Text>Enable sensors:</Text>
      <CreateCollection toGetInfo={setNewCollection}/>
      <AccelerometerSensor witInfoCollection={newCollection}/>
      <GyroscopeSensor witInfoCollection={newCollection}/>
      <Magnetometer witInfoCollection={newCollection}/>
      {/* <LocationComponent /> */}
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
