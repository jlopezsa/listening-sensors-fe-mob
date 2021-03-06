/* eslint-disable */
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createCollectionData } from '../../database/firebase';
import LocationComponent from '../Location/LocationComponent'

function CreateCollection(props) {
  const { toGetInfo } = props;
  const [infoCollection, setInfoCollection] = useState({});
  const [ coordinateSensors, setCoodinateSensors ] = useState ({
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (field, text) => {
    setInfoCollection({
      ...infoCollection,
      [field]: text,
    });
  };

  const onPressCreate = (e) => {
    e.preventDefault();
    const { nameCollection, nameSensorsSet} = infoCollection;
    createCollectionData(nameCollection, nameSensorsSet, coordinateSensors);
    toGetInfo(infoCollection);
  }

  return (
    <View>
      <Text>Ingrese nombre de la colección (ID)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('nameCollection', text)}
      />
      <Text>Ingrese el nombre del conjunto de sensores</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('nameSensorsSet', text)}
        placeHolder='Ingrese nombre'
      />
      <LocationComponent style={styles.location} updateCoordinates={setCoodinateSensors}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPressCreate} placeHolder='Ingrese nombre'>
          <Text style={styles.buttonText}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    backgroundColor: 'grey',
    color: 'black',
    borderRadius: 5,
    height: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    width: 350,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 0,
    // height: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  location: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export default CreateCollection;
