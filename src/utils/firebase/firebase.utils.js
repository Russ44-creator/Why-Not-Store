import { getQueriesForElement } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACBeafSnoavcrJzbl0zoRRT5wHlwa-gZ4",
    authDomain: "why-not-store-db.firebaseapp.com",
    projectId: "why-not-store-db",
    storageBucket: "why-not-store-db.appspot.com",
    messagingSenderId: "327522388623",
    appId: "1:327522388623:web:d5c00a2d01527dd784befa"
  };
  
  // Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
}
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt});

        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;

};