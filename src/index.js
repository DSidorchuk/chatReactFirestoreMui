import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ2qldcDTkWKVToPboAS3J2j0uJKpY-PY",
  authDomain: "chat-dsidorchuk.firebaseapp.com",
  databaseURL: "https://chat-dsidorchuk-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-dsidorchuk",
  storageBucket: "chat-dsidorchuk.appspot.com",
  messagingSenderId: "764259019597",
  appId: "1:764259019597:web:f5f484e46b8c5037042504"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
      app,
      auth,
      db
    }}>
      <App/>
    </Context.Provider>
);

