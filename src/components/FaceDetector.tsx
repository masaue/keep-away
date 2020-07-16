/**
 * FaceDetector.tsx
 *
 * @author masaue
 */

import AsyncLock from 'async-lock';
import {Camera, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {WebScreenNavigationProp} from '../screens/WebScreen';

type Props = {
  children: React.ReactNode;
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
  const styles = StyleSheet.create({
    camera: {flex: 1},
  });
  const lock = new AsyncLock();
  let camera: Camera | null;
  let tookPicture = false;
  const handleFacesDetected = (result: FaceDetectionResult) => {
    lock.acquire('navigate', async () => {
      if (result.faces.length !== 0) {
        if (!camera || tookPicture) {
          return;
        }
        const picture = await camera.takePictureAsync();
        tookPicture = true;
        props.navigation.navigate('Block', {uri: picture.uri});
      } else {
        tookPicture = false;
        props.navigation.navigate('Web');
      }
    });
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
      style={styles.camera}
      type={Camera.Constants.Type.front}>
      {props.children}
    </Camera>
  );
};
