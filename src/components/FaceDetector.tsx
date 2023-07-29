/**
 * FaceDetector.tsx
 *
 * @author masaue
 */

import AsyncLock from 'async-lock';
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as FileSystem from 'expo-file-system';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';

import {WebScreenNavigationProp} from '../screens/WebScreen';

type Props = {
  children?: React.ReactNode;
  navigation?: WebScreenNavigationProp;
};

export default (props: Props) => {
  const DETECT_FACE_AREA_PERCENT = 20;
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
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
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const area = windowHeight * windowWidth * (DETECT_FACE_AREA_PERCENT / 100);
  const navigateToBlock = (result: FaceDetectionResult) => {
    if (result.faces.length === 0) {
      return false;
    }
    return result.faces.some((face) => {
      const faceFeature = face as FaceDetector.FaceFeature;
      const height = faceFeature.bounds.size.height;
      const width = faceFeature.bounds.size.width;
      return height * width > area;
    });
  };
  const lock = new AsyncLock();
  let camera: Camera | null;
  let uri = '';
  const handleFacesDetected = (result: FaceDetectionResult) => {
    lock.acquire('navigate', async () => {
      if (navigateToBlock(result)) {
        if (!camera || uri) {
          return;
        }
        const picture = await camera.takePictureAsync();
        uri = picture.uri;
        props.navigation?.navigate('Block', {uri});
      } else {
        if (!uri) {
          return;
        }
        FileSystem.deleteAsync(uri);
        uri = '';
        props.navigation?.navigate('Web');
      }
    });
  };
  return (
    <Camera
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
        minDetectionInterval: 1000,
        tracking: true,
      }}
      onFacesDetected={handleFacesDetected}
      ref={(instance: Camera | null) => {
        camera = instance;
      }}
      style={styles.camera}
      type={CameraType.front}>
      {props.children}
    </Camera>
  );
};
