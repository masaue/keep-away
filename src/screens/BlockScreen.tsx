/**
 * BlockScreen.tsx
 *
 * @author masaue
 */

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {Bounds, RootStackParamList} from '../Navigator';

type BlockScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Block'
>;
type BlcokScreenProp = RouteProp<RootStackParamList, 'Block'>;
type Props = {
  navigation: BlockScreenNavigationProp;
  route: BlcokScreenProp;
};

export default class BlockScreen extends React.Component<Props> {
  render() {
    const faceRectangles = this.props.route.params.boundsList.map(
      (bounds: Bounds, index: number) => {
        const styles = StyleSheet.create({
          faceRectangle: {
            backgroundColor: 'transparent',
            borderColor: 'red',
            borderWidth: 2,
            height: bounds.size.height,
            left: bounds.origin.x,
            position: 'absolute',
            top: bounds.origin.y,
            width: bounds.size.width,
          },
        });
        return <View key={index} style={styles.faceRectangle} />;
      },
    );
    const styles = StyleSheet.create({
      image: {flex: 1},
    });
    return (
      <ImageBackground
        source={{uri: this.props.route.params.uri}}
        style={styles.image}>
        {faceRectangles}
      </ImageBackground>
    );
  }
}
