// Add error boundaries
import { useEffect } from 'react';
import React from 'react-native';
import ErrorBoundary from 'react-native-error-boundary'

const CustomFallback = (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>An error occurred</Text>
    <Text>Error: {props.error.toString()}</Text>
    <Text>Error Details: {props.error.stack}</Text>
    <Button onPress={props.resetError} title="Try Again" />
  </View>
);
const App = () => (
  <ErrorBoundary FallbackComponent={CustomFallback}>
     <View>
    <Text>Welcome to erp system</Text>
  </View>
  </ErrorBoundary>
)