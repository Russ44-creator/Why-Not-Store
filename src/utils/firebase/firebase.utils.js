import { getQueriesForElement } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"
}
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}) => {
    if(!userAuth)
        return; 
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, 
                    createdAt, ...additionalInformation });

        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password)
        return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password)
        return;

    return await signInWithEmailAndPassword(auth, email, password);
};