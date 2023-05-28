// import { getQueriesForElement } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, 
        GoogleAuthProvider, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, 
        collection, writeBatch, query, getDocs } from 'firebase/firestore'
// import { compileString } from 'sass';

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
initializeApp(firebaseConfig);
// const firebaseapp = ...

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"
}
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef= collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc
    }, {});

    return categoryMap;
}

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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
{
    onAuthStateChanged(auth, callback);
} 