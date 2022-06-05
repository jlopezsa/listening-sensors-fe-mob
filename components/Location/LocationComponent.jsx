/* eslint-disable */
import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

function LocationComponent() {
  const [location, setLocation] = useState({
    coords:{
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null,
    },
    timestamp: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!',
        );
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    console.log('FLAG-01');
    text = errorMsg;
  } else if (location) {
    console.log('FLAG-LOCATION: ', location.coords.latitude, location.coords.longitude);
    console.log('LOCATION: ', location);
    text = JSON.stringify(location);
    console.log('FLAG-TEXT: ', text);
    // debugger;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraphTitle}>Información de ubicación de los sensores:</Text>
      <Text style={styles.paragraph}>Latitud: {location.coords.latitude}, Longitud: {location.coords.longitude}</Text>
      <Text style={styles.paragraph}>Altitud: {location.coords.altitude} msnm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
  },
  paragraphTitle: {
    fontWeight: 'bold',
  }
});

export default LocationComponent;
