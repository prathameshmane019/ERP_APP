import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import getUserData from './utils/getUser';
import ErrorBoundary from 'react-native-error-boundary';
import AttendanceLoader from './components/Loader';
export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const CustomFallback = (props) => (
    <View>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      <Button onPress={props.resetError} title={'Try again'} />
    </View>
  )
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/(auth)/login');
      } else if (user.role === 'faculty') {
        router.replace('/(faculty)/menu');
      } else if (user.role === 'student') {
        router.replace('/(student)');
      } else {
        console.error('Unknown user role:', user?.role);
        router.replace('/login');
      }
    }
  }, [loading, user, router]);

  return ( 
    <ErrorBoundary FallbackComponent={CustomFallback}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AttendanceLoader isVisible={true}/>
    </View>
    </ErrorBoundary>
  );
}
