/* eslint-disable */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccelerometerSensor from './components/Accelerometer/Accelerometer';
import GyroscopeSensor from './components/Gyroscope/Gyroscope';
import LocationComponent from './components/Location/LocationComponent'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Enable sensors:</Text>
      {/* <AccelerometerSensor /> */}
      {/* <GyroscopeSensor /> */}
      <LocationComponent />
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
