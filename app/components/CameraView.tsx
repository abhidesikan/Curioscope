import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView as ExpoCameraView } from 'expo-camera';

export function CameraView() {
  return (
    <View style={styles.container}>
      <ExpoCameraView style={styles.camera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
});