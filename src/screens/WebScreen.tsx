/**
 * WebScreen.tsx
 *
 * @author masaue
 */

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {WebView} from 'react-native-webview';

import FaceDetector from '../components/FaceDetector';
import {RootStackParamList} from '../Navigator';

export type WebScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Web'
>;

type Props = {
  navigation?: WebScreenNavigationProp;
};

export default class WebScreen extends React.Component<Props> {
  render() {
    return (
      <>
        <FaceDetector navigation={this.props.navigation}>
          <WebView source={{uri: 'https://m.youtube.com'}} />
        </FaceDetector>
      </>
    );
  }
}
