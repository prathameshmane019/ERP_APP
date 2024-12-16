import React, { useState, useEffect, useContext } from 'react';
import { View, Button } from 'react-native';  // Added missing Button import
import { useRouter } from 'expo-router';
import ErrorBoundary from 'react-native-error-boundary';
import AttendanceLoader from './components/Loader';
import AuthContext from './AuthContext';

export default function HomeScreen() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const CustomFallback = (props) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>An error occurred</Text>
      <Button 
        onPress={props.resetError} 
        title="Try Again" 
      />
    </View>
  );

  useEffect(() => {
    const handleRouting = async () => {
      // Wait for loading to complete before routing
      if (loading === false) {
        if (!user) {
          router.replace('/(auth)/login');
        } else {
          switch(user.role) {
            case 'faculty':
              router.replace('/(faculty)/menu');
              break;
            case 'student':
              router.replace('/(student)');
              break;
            default:
              console.error('Unknown user role:', user?.role);
              router.replace('/login');
          }
        }
      }
    };

    handleRouting();
  }, [loading, user, router]);

  // Ensure loader is shown during loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AttendanceLoader isVisible={true} />
      </View>
    );
  }

  return ( 
    <ErrorBoundary FallbackComponent={CustomFallback}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AttendanceLoader isVisible={loading}/>
    </View>
    </ErrorBoundary>
  );
}
