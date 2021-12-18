import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

function Layout(props) {
    return (
        <View style={styles.container} >
            <Text>test layout</Text>
            
            <View>
                {props.children}
            </View>
        </View>
    );
}

export default Layout;