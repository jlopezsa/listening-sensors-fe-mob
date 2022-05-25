/* eslint-disable */
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-web';

function CreateCollection() {
  const [infoCollection, setInfoCollection] = useState({});

  const handleChange = (field, text) => {
    setInfoCollection({
      ...infoCollection,
      [field]: text,
    });
  };

  const createCollection = (e) => {
    e.preventDefault();
    console.log('NAMES: ', infoCollection);
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
      <TouchableOpacity style={styles.button} onPress={createCollection} placeHolder='Ingrese nombre'>
        <Text>Crear conjunto de sensores</Text>
      </TouchableOpacity>
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
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 20,
  },
});

export default CreateCollection;
