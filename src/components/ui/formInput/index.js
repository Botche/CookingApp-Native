import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

function FormInput(props) {
    const inputContainerStyles = { ...styles.container, ...props.inputContainerStyles };
    const errorMessage = props.inputError == ''
        ? null
        : (
            <Text style={styles.error}>
                {props.inputError}
            </Text>
        )

    return (
        <View style={inputContainerStyles}>
            <Text style={styles.label}>
                {props.labelText}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.inputValue}
                secureTextEntry={props.isPassword}
            >
            </TextInput>

            {errorMessage}
        </View>
    );
}

FormInput.propTypes = {
    inputError: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    buttonContainerStyles: PropTypes.object,
    inputContainerStyles: PropTypes.object,
    isPassword: PropTypes.bool,
}

export default FormInput;
