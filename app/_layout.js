import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './AuthContext';
import LogoutButton from './components/logout';
import UpdateCheckScreen from './components/UpdateScreenCheck';
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from './theme';
import ErrorBoundary from 'react-native-error-boundary';

export default function Layout() {
  const CustomFallback = (props) => (
    <View>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      <Button onPress={props.resetError} title={'Try again'} />
    </View>
  );

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerRight: () => (
              <>
                <LogoutButton />
                <UpdateCheckScreen />
              </>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/ResetPasswordScreen" options={{ headerShown: false }} />
          <Stack.Screen name="profile/index" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
          <Stack.Screen name="(faculty)/attendance/index" options={{ title: 'Attendance' }}/>
          <Stack.Screen name="(faculty)/menu" options={{ headerShown: false }}  />
          <Stack.Screen name="(faculty)/take-attendance" options={{ title: 'Take Attendance' }} />
          <Stack.Screen name="(faculty)/update-attendance" options={{ title: 'Update Attendance' }} />
          <Stack.Screen name="(student)/view" options={{ title: 'Display Attendance' }} />
          <Stack.Screen name="update-info/index" options={{ title: 'Update Information' }} />
        </Stack>      
      </PaperProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}