/**
 * WebScreen.tsx
 *
 * @author masaue
 */

import React from 'react';
import {WebView} from 'react-native-webview';

export default class WebScreen extends React.Component {
  render() {
    return <WebView source={{uri: 'https://m.youtube.com'}} />;
  }
}
