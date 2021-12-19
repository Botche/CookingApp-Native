import React, { useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

import FormInput from '../../ui/formInput';
import FormButton from '../../ui/formButton';

import styles from './styles';
import constants from '../../../constants';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');

    const navigateToLoginScreen = () => {
        props.navigation.navigate(constants.screens.login);
    }

    const register = async () => {
        try {
            setEmailErrorMessage('');
            setPasswordErrorMessage('');
            setRepeatPasswordErrorMessage('');


            if (email === '') {
                setEmailErrorMessage(constants.exceptionMessages.emailRequired);
                return;
            }

            if (password === '') {
                setPasswordErrorMessage(constants.exceptionMessages.passwordRequired);
                return;
            }

            if (password !== repeatPassword) {
                setRepeatPasswordErrorMessage(constants.exceptionMessages.passwordMustMatch);
            }

            await auth().createUserWithEmailAndPassword(email, password);
            navigateToLoginScreen();
        } catch (error) {
            switch (error.code) {
                case constants.firebaseErrorCodes.authInvalidEmail:
                    setEmailErrorMessage(constants.exceptionMessages.emailInvalid);
                    break;
                case constants.firebaseErrorCodes.authEmailAreadyInUse:
                    setEmailErrorMessage(constants.exceptionMessages.emailAlreadyUsed);
                    break;
                case constants.firebaseErrorCodes.authWrongPassword:
                    setPasswordErrorMessage(constants.exceptionMessages.passwordIsWrong);
                    break;
                case constants.firebaseErrorCodes.authWeakPassword:
                    setPasswordErrorMessage(constants.exceptionMessages.passwordWeak);
                    break;
                case constants.firebaseErrorCodes.authTooManyAttempts:
                    setEmailErrorMessage(constants.exceptionMessages.tooManyAttempts);
                    break;
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>

            <View style={styles.form}>
                <FormInput
                    labelText="Email"
                    inputValue={email}
                    onChangeText={setEmail}
                    inputError={emailErrorMessage}
                />

                <FormInput
                    labelText="Password"
                    inputValue={password}
                    isPassword={true}
                    onChangeText={setPassword}
                    inputError={passwordErrorMessage}
                />

                <FormInput
                    labelText="Repeat password"
                    inputValue={repeatPassword}
                    isPassword={true}
                    onChangeText={setRepeatPassword}
                    inputError={repeatPasswordErrorMessage}
                />

                <FormButton
                    text="Register"
                    onPressFunc={register}
                />
            </View>


            <View style={styles.navigationLinkContainer}>
                <Text>
                    If you already have registration, <Text style={styles.navigationLink} onPress={navigateToLoginScreen}>click here</Text>
                </Text>
            </View>
        </View>
    );
}

export default Register;
