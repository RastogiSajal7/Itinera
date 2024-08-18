// LoadingIndicator.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/icon.jpg')} 
        style={styles.image} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LoadingIndicator;
