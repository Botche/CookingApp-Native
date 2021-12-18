import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

function FormButton(props) {
    const buttonContainerStyles = { ...styles.container, ...props.buttonContainerStyles };

    return (
        <View style={buttonContainerStyles}>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPressFunc}
            >
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired,
    buttonContainerStyles: PropTypes.object,
}

export default FormButton;
