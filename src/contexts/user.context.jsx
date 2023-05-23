import { createContext, useState, useEffect } from "react"; 
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setcurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState(null);
    const value = { currentUser, setcurrentUser };

    
    useEffect(() => {
        const unsubsribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setcurrentUser(user);
        });
        return unsubsribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

