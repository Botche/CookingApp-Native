import React, { useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';

import FormInput from '../../ui/formInput'
import FormButton from '../../ui/formButton';

import styles from './styles';
import constants from '../../../constants';

function Login(props) {
    const [email, setEmail] = useState('test1@example.com');
    const [password, setPassword] = useState('test1@example.com');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const navigateToRegistrationScreen = () => {
        props.navigation.navigate(constants.screens.register);
    }

    const login = async () => {
        try {
            setEmailErrorMessage('');
            setPasswordErrorMessage('');


            if (email == '') {
                setEmailErrorMessage('Email is required!');
                return;
            }

            if (password == '') {
                setPasswordErrorMessage('Password is required!');
                return;
            }

            const response = await auth().signInWithEmailAndPassword(email, password);

            props.setUserId(response.user.uid);
        } catch (error) {
            switch(error.code) {
                case 'auth/invalid-email':
                    setEmailErrorMessage('Email is not valid!');
                    break;
                case 'auth/wrong-password':
                    setPasswordErrorMessage('Password is incorrect!');
                    break;
                case 'auth/user-not-found':
                    setEmailErrorMessage('User with such credentials does not exist!');
                    break;
                case 'auth/too-many-requests':
                    setEmailErrorMessage('Too many bad attemps, please try again later!');
                    break;
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

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

                <FormButton 
                    text="Login" 
                    onPressFunc={login}
                />
            </View>

            <View style={styles.navigationLinkContainer}>
                <Text>
                    If you don't have registration, <Text style={styles.navigationLink} onPress={navigateToRegistrationScreen}>click here</Text>
                </Text>
            </View>
        </View>
    );
}

Login.propTypes = {
    setUserId: PropTypes.func.isRequired,
};

export default Login;
