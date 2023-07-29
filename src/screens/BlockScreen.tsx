/**
 * BlockScreen.tsx
 *
 * @author masaue
 */

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as FaceDetector from 'expo-face-detector';
import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';

import {RootStackParamList} from '../Navigator';

type BlockScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Block'
>;
type BlcokScreenProp = RouteProp<RootStackParamList, 'Block'>;
type Props = {
  navigation?: BlockScreenNavigationProp;
  route?: BlcokScreenProp;
};
type State = {
  faceRectangles: React.ReactNode[];
};

export default class BlockScreen extends React.Component<Props, State> {
  uri: string;

  constructor(props: Props) {
    super(props);
    this.state = {faceRectangles: []};
    this.uri = this.props.route?.params.uri || '';
  }

  componentDidMount() {
    FaceDetector.detectFacesAsync(this.uri).then(
      (result) => {
        this.setState({faceRectangles: this.faceRectangles(result)});
      },
    );
  }

  render() {
    const styles = StyleSheet.create({
      image: {flex: 1},
    });
    return (
      <ImageBackground
        source={{uri: this.uri}}
        style={styles.image}>
        {this.state.faceRectangles}
      </ImageBackground>
    );
  }

  private faceRectangles = (result: {
    faces: FaceDetector.FaceFeature[];
    image: FaceDetector.Image;
  }) => {
    const xRatio = Dimensions.get('window').width / result.image.width;
    const yRatio = Dimensions.get('window').height / result.image.height;
    return result.faces.map((face, index: number) => {
      const styles = StyleSheet.create({
        faceRectangle: {
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 2,
          height: face.bounds.size.height * yRatio,
          left: face.bounds.origin.x * xRatio,
          position: 'absolute',
          top: face.bounds.origin.y * yRatio,
          width: face.bounds.size.width * xRatio,
        },
      });
      return <View key={index} style={styles.faceRectangle} />;
    });
  };
}
