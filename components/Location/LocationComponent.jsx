/* eslint-disable */
import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

function LocationComponent({ updateCoordinates }) {
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
      updateCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    height: 80,
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
