// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, addDoc, Timestamp } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: 'https://listeningsensors.firebaseio.com/',
  projectId: 'listeningsensors',
  storageBucket: 'listeningsensors.appspot.com',
  messagingSenderId: '634491630956',
  appId: '1:634491630956:web:f6d37d278e93993c8daf49',
  measurementId: 'G-E2B396DSM5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbRT = getDatabase();

async function getDataSensors(collectionName) {
  const accelerometerCol = collection(db, collectionName);
  const accelerometerSnapshot = await getDoc(accelerometerCol);
  const accelerometerList = accelerometerSnapshot.docs.map((doc) => doc.data());
  return accelerometerList;
}

const createDataSensors = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      x: data.x,
      y: data.y,
      z: data.z,
      createTime: Timestamp.fromDate(new Date()),
    });
    // console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
function createCollectionData(nameColl, nameSenSet) {
  set(ref(dbRT, nameColl), {
    createTime: Timestamp.fromDate(new Date()),
    name: nameSenSet,
    location: {
      latitude: 3.333333,
      longitude: -73.3333,
    },
  });
}

function writeAccelerometerData(data) {
  set(ref(dbRT, 'sensorSet_A4/accelerometer'), {
    createTime: Timestamp.fromDate(new Date()),
    x: data.x,
    y: data.y,
    z: data.z,
  });
}
function writeGyroscopeData(data) {
  set(ref(dbRT, 'sensorSet_A4/gyroscope'), {
    createTime: Timestamp.fromDate(new Date()),
    x: data.x,
    y: data.y,
    z: data.z,
  });
}
function writeMagnetometerData(data) {
  set(ref(dbRT, 'sensorSet_A4/magnetometer'), {
    createTime: Timestamp.fromDate(new Date()),
    x: data.x,
    y: data.y,
    z: data.z,
  });
}

export {
  app,
  getDataSensors,
  createDataSensors,
  writeAccelerometerData,
  writeGyroscopeData,
  writeMagnetometerData,
  createCollectionData,
};
