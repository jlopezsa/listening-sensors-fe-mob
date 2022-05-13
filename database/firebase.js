// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getFirestore, collection, getDoc, addDoc, Timestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyANoaEsNHHUEbUomvFtLy62WX7moK78FB8',
  authDomain: 'listeningsensors.firebaseapp.com',
  //   databaseURL: 'https://listeningsensors-default-rtdb.firebaseio.com',
  projectId: 'listeningsensors',
  storageBucket: 'listeningsensors.appspot.com',
  messagingSenderId: '634491630956',
  appId: '1:634491630956:web:f6d37d278e93993c8daf49',
  measurementId: 'G-E2B396DSM5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDataSensors(collectionName) {
  const accelerometerCol = collection(db, collectionName);
  const accelerometerSnapshot = await getDoc(accelerometerCol);
  const accelerometerList = accelerometerSnapshot.docs.map((doc) => doc.data());
  return accelerometerList;
}

const createDataSensors = async (collectionName, data) => {
  const { accelerometerData } = data;
  try {
    await addDoc(collection(db, collectionName), {
      x: accelerometerData.x,
      y: accelerometerData.y,
      z: accelerometerData.z,
      createTime: Timestamp.fromDate(new Date()),
    });
    // console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export {
  app, getDataSensors, createDataSensors,
};
