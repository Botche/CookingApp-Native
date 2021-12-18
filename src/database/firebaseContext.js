import { firebase } from "@react-native-firebase/database"

const FIREBASE_REALTIME_DATABASE_URL = 'https://cooking-app-native-default-rtdb.europe-west1.firebasedatabase.app';

const firebaseContext = {
    getDatabaseReference: (url) => {
        return firebase
            .app()
            .database(FIREBASE_REALTIME_DATABASE_URL)
            .ref(url);
    },
}

export default firebaseContext;