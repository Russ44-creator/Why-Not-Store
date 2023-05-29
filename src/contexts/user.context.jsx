import { createContext, useEffect, useReducer } from "react"; 
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
    currentUser: null,
    setcurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    const { type, payload }= action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setcurrentUser] = useState(null);
    const [{ currentUser }, dispatch]= useReducer(userReducer, INITIAL_STATE);
    const setcurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ));
    }
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

