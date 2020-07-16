/**
 * Navigator.tsx
 *
 * @author masaue
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BlockScreen from './screens/BlockScreen';
import WebScreen from './screens/WebScreen';

export type Bounds = {
  origin: {x: number; y: number};
  size: {height: number; width: number};
};

export type RootStackParamList = {
  Block: {uri: string};
  Web: undefined;
};

export default class Navigator extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Web"
            screenOptions={{headerShown: false}}>
            <Stack.Screen component={BlockScreen} name="Block" />
            <Stack.Screen component={WebScreen} name="Web" />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
