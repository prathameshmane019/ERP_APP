import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
// import * as Sentry from '@sentry/react-native';

const { width, height } = Dimensions.get('window');


const ErrorFallbackComponent = ({ error, resetError }) => {
  const handleReportError = () => {
    // Log the error to Sentry
    // Sentry.captureException(error);
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/security-research.json')} // You'll need to add this Lottie animation
        autoPlay
        loop
        style={styles.animation}
      />
      
      <Text style={styles.title}>Oops! Something Went Wrong</Text>
      
      <View style={styles.errorDetailsContainer}>
        <Text style={styles.errorText}>Error Details:</Text>
        <Text style={styles.errorMessageText}>{error.toString()}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={resetError}
          style={styles.button}
        >
          Try Again
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={handleReportError}
          style={styles.button}
        >
          Report Error
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  animation: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorDetailsContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  errorMessageText: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
});

export default ErrorFallbackComponent;