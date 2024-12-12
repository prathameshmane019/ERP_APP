// Add error boundaries
import { useEffect } from 'react';
import React from 'react-native';
import ErrorBoundary from 'react-native-error-boundary'

const CustomFallback = (props) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button onPress={props.resetError} title={'Try again'} />
  </View>
)

const App = () => (
  <ErrorBoundary FallbackComponent={CustomFallback}>
     <View>
    <Text>Welcome to erp system</Text>
  </View>
  </ErrorBoundary>
)