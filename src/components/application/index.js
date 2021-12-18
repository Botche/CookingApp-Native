import React, { useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/login';
import Register from '../screens/register';

import constants from '../../constants';

const Stack = createStackNavigator();

function App(props) {
  let [userId, setUserId] = useState(null);

  const screenList = userId ? (
    <>
      <Stack.Screen name={constants.screens.recipes} options={{ header: () => null }} >
        {props => <Recipices {...props} userId={userId} />}
      </Stack.Screen>
    </>
  ) : (
    <>
      <Stack.Screen name={constants.screens.register} options={{ header: () => null }}>
        {props => <Register {...props} />}
      </Stack.Screen>
      <Stack.Screen name={constants.screens.login} options={{ header: () => null }}>
        {props => <Login {...props} setUserId={setUserId} />}
      </Stack.Screen>
    </>

  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screenList}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
