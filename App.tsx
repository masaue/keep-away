/**
 * App.tsx
 *
 * @author masaue
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default class App extends React.Component {
  render() {
    const styles = StyleSheet.create({
      safeAreaView: {
        flex: 1,
      },
    });

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <WebView source={{uri: 'https://youtube.com'}} />
        </SafeAreaView>
      </>
    );
  }
}
