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


            if (email == '') {
                setEmailErrorMessage('Email is required!');
                return;
            }

            if (password == '') {
                setPasswordErrorMessage('Password is required!');
                return;
            }

            if (password != repeatPassword) {
                setRepeatPasswordErrorMessage('Passwords must match!');
            }

            await auth().createUserWithEmailAndPassword(email, password);
            navigateToLoginScreen();
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailErrorMessage('Email is not valid!');
                    break;
                case 'auth/email-already-in-use':
                    setEmailErrorMessage('Email is already used!');
                    break;
                case 'auth/wrong-password':
                    setPasswordErrorMessage('Password is incorrect!');
                    break;
                case 'auth/weak-password':
                    setPasswordErrorMessage('Password should be at least 6 characters!');
                    break;
                case 'auth/too-many-requests':
                    setEmailErrorMessage('Too many bad attemps, please try again later!');
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
