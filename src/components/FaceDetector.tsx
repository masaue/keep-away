/**
 * FaceDetector.tsx
 *
 * @author masaue
 */

import {Camera, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {WebScreenNavigationProp} from '../screens/WebScreen';

type Props = {
  navigation: WebScreenNavigationProp;
};

export default (props: Props) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    // TODO アプリ終了
    return <Text>No access to camera</Text>;
  }
  const style = StyleSheet.create({
    camera: {height: 1, width: 1},
  });
  let camera: Camera | null;
  let tookPicture = false;
  const handleFacesDetected = async (result: FaceDetectionResult) => {
    if (result.faces.length !== 0) {
      if (!camera || tookPicture) {
        return;
      }
      await camera.takePictureAsync();
      tookPicture = true;
      /*
      const boundsList = result.faces.map((face) => {
        return face.bounds;
      });
       */
      props.navigation.navigate('Block');
    } else {
      tookPicture = false;
      props.navigation.navigate('Web');
    }
  };
  return (
    <Camera
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.none,
        minDetectionInterval: 1000,
        tracking: true,
      }}
      onFacesDetected={handleFacesDetected}
      ref={(instance: Camera | null) => {
        camera = instance;
      }}
      style={style.camera}
      type={Camera.Constants.Type.front}
    />
  );
};
