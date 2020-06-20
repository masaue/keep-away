/**
 * Navigator.tsx
 *
 * @author masaue
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import WebScreen from './screens/WebScreen';

export default class Navigator extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Web" component={WebScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
