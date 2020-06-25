/**
 * BlockScreen.tsx
 *
 * @author masaue
 */

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {WebView} from 'react-native-webview';

import {RootStackParamList} from '../Navigator';

type BlockScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Block'
>;
type Props = {
  navigation: BlockScreenNavigationProp;
};

export default class BlockScreen extends React.Component<Props> {
  render() {
    return <WebView source={{uri: 'https://google.co.jp'}} />;
  }
}
