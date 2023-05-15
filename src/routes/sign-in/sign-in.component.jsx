import { useEffect  } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if(response) {
    //         const userDocref = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocref = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in in this page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </div>
    );
}

export default SignIn;