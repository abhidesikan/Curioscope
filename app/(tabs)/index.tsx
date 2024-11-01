import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraView } from '../components/CameraView';

function Index() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    async function checkCamera() {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log('Permission status:', status);
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Permission error:', error);
      }
    }
    checkCamera();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.status}>
          Status: {hasPermission ? 'Permission Granted' : 'No Permission'}
        </Text>
        <Button 
          title={showCamera ? "Hide Camera" : "Show Camera"} 
          onPress={() => setShowCamera(!showCamera)}
        />
      </View>

      <View style={styles.content}>
        {showCamera && hasPermission ? (
          <CameraView />
        ) : (
          <View style={styles.placeholder}>
            <Text>Camera is hidden</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#f0f0f0',
  },
  status: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;