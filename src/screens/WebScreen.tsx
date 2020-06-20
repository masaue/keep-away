/**
 * WebScreen.tsx
 *
 * @author masaue
 */

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {WebView} from 'react-native-webview';

import {RootStackParamList} from '../Navigator';

type WebScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Web'>;
type Props = {
  navigation: WebScreenNavigationProp;
};

export default class WebScreen extends React.Component<Props> {
  render() {
    const {navigation} = this.props;
    setTimeout(() => {
      navigation.navigate('Block');
    }, 3000);
    return <WebView source={{uri: 'https://m.youtube.com'}} />;
  }
}