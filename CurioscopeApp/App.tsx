import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {RNCamera} from 'react-native-camera';

// Mock database of objects
const objectDatabase = {
  book: {
    name: 'Book',
    description:
      'A book is a medium for recording information in the form of writing or images, typically composed of many pages bound together and protected by a cover.',
    funFact:
      'The worlds largest book is 5 feet tall and 7 feet wide when open!',
  },
  tree: {
    name: 'Tree',
    description:
      'A tree is a perennial plant with an elongated stem, or trunk, supporting branches and leaves in most species.',
    funFact: 'The oldest known living tree is over 5,000 years old!',
  },
  chair: {
    name: 'Chair',
    description:
      'A chair is a piece of furniture with a raised surface supported by legs, commonly used to seat a single person.',
    funFact: 'The electric chair was invented by a dentist!',
  },
};

const App = () => {
  const [detectedObject, setDetectedObject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCapture = async () => {
    // Simulate object detection by randomly selecting an object
    const objects = Object.keys(objectDatabase);
    const randomObject = objects[Math.floor(Math.random() * objects.length)];
    setDetectedObject(objectDatabase[randomObject]);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}>
        <View style={styles.captureContainer}>
          <TouchableOpacity onPress={handleCapture} style={styles.capture}>
            <Text style={styles.captureText}>Analyze</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          {detectedObject && (
            <>
              <Text style={styles.modalTitle}>{detectedObject.name}</Text>
              <Text style={styles.modalText}>{detectedObject.description}</Text>
              <Text style={styles.modalFunFact}>
                Fun Fact: {detectedObject.funFact}
              </Text>
            </>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalFunFact: {
    fontStyle: 'italic',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
