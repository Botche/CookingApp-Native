import { StyleSheet } from "react-native";
import { Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
        paddingTop: 20,
    },
    categoryContainer: {
        marginBottom: 20,
        ...Platform.select({
            ios: {
                position: "relative",
                zIndex: 100,
            },
            android: {
            },
        }),
    },
    header: {
        fontSize: 24,
        marginBottom: 25,
    },
    form: {
        width: '80%',
    },
});

export default styles;
