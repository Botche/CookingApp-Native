import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/login';
import Register from '../screens/register';
import Recipes from '../screens/recipes';
import Recipe from '../screens/recipe';

import constants from '../../constants';
import CreateRecipe from '../screens/createRecipe';

const Stack = createStackNavigator();

function App(props) {
  let [userId, setUserId] = useState(null);

  const screenList = userId ? (
    <>
      <Stack.Screen name={constants.screens.recipes} >
        {props => <Recipes {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name={constants.screens.recipe} >
        {props => <Recipe {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name={constants.screens.createRepice} >
        {props => <CreateRecipe {...props} userId={userId} />}
      </Stack.Screen>
    </>
  ) : (
    <>
      <Stack.Screen name={constants.screens.login} options={{ header: () => null }}>
        {props => <Login {...props} setUserId={setUserId} />}
      </Stack.Screen>
      <Stack.Screen name={constants.screens.register} options={{ header: () => null }}>
        {props => <Register {...props} />}
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
