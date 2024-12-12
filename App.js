// Add error boundaries
import React, { ErrorBoundary } from 'react-native';

function App() {
  // Add console logs in key lifecycle methods
useEffect(() => {
  console.log('App mounted');
}, []);
  return (
    <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
      {/* Your app content */}
    </ErrorBoundary>
  );
}

