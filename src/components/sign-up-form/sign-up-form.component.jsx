import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmpassword } = formFields;

    // const { setcurrentUser } = useContext(UserContext); 

    // const val = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmpassword){
            alert("password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else{
                console.log('user creation error', error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>No Account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="test" required onChange={handleChange} 
                    name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} 
                    name="email" value={email}/>

                <FormInput label="Password" type='password' required onChange={handleChange} 
                    name="password" value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} 
                    name="confirmpassword" value={confirmpassword}/>

                <Button buttonType="">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;