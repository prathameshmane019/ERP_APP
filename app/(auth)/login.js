// // login.js
// import React, { useState, useContext, useEffect } from 'react';

// import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { useRouter, Link } from 'expo-router';
// import AuthContext from '../AuthContext';
// import { TextInput, Button, Surface, Text, useTheme, ActivityIndicator } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// export default function LoginScreen () {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('faculty');
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, user, loading: authLoading } = useContext(AuthContext);
//   const router = useRouter();
//   const theme = useTheme();

//   useEffect(() => {
//     if (user && !authLoading) {
//       redirectUser(user.role);
//     }
//   }, [user, authLoading]);

//   const redirectUser = (userRole) => {
//     if (userRole === 'faculty') {
//       router.replace('/(faculty)');
//     } else if (userRole === 'student') {
//       router.replace('/(student)/view');
//     }
//   };

//   const handleCancel = () => {
//     setPassword("");
//     setUsername("");
//   }

//   const handleLogin = async () => {
//     setIsLoading(true);
//     try {
//       await login(username, password, role);
//     } catch (error) {
//       alert('Login Failed: ' + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (authLoading || user) return null;

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <LinearGradient
//         colors={['#CD91F0', '#51047D']}
//         style={styles.gradient}
//       >
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Image
//             source={require('../../assets/login.png')}
//             style={styles.illustration}
//           />
//           <Surface style={styles.surface}>
//             <Text style={styles.title}>Welcome Back</Text>
//             <View style={styles.roleToggle}>
//               <Button
//                 mode={role === 'faculty' ? 'contained' : 'outlined'}
//                 onPress={() => setRole('faculty')}
//                 style={[styles.roleButton, role === 'faculty' && styles.activeRoleButton]}
//                 disabled={isLoading}
//               >
//                 Faculty
//               </Button>
//               <Button
//                 mode={role === 'student' ? 'contained' : 'outlined'}
//                 onPress={() => setRole('student')}
//                 style={[styles.roleButton, role === 'student' && styles.activeRoleButton]}
//                 disabled={isLoading}
//               >
//                 Student
//               </Button>
//             </View>
//             <TextInput
//               label="Username"
//               value={username}
//               onChangeText={setUsername}
//               style={styles.input}
//               mode="outlined"
//               left={<TextInput.Icon icon="account" />}
//               disabled={isLoading}
//             />
//             <TextInput
//               label="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//               mode="outlined"
//               left={<TextInput.Icon icon="lock" />}
//               disabled={isLoading}
//             />
//             <Link href="/ResetPasswordScreen">
//               <Text style={styles.resetLink}>Reset Password</Text>
//             </Link>
//             <View style={styles.bottomAction}>
//               <Button
//                 mode="outlined"
//                 onPress={handleCancel}
//                 style={styles.cancelButton}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={handleLogin}
//                 style={styles.loginButton}
//                 icon={({ size, color }) => (
//                   isLoading ? 
//                   <ActivityIndicator color={color} size={size} /> :
//                   <MaterialCommunityIcons name="login" size={size} color={color} />
//                 )}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </Button>
//             </View>
//           </Surface>
//         </ScrollView>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 0,
//   },
//   surface: {
//     padding: 20,
//     borderTopStartRadius: 50,
//     borderTopEndRadius: 50,
//     elevation: 8,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     minHeight: 420,
//   },
//   illustration: {
//     width: 300,
//     height: 300,
//     marginVertical:40,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   roleToggle: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     justifyContent: 'center',
//   },
//   roleButton: {
//     marginHorizontal: 5,
//     flex: 1,
//     borderRadius: 25,
//   },
//   activeRoleButton: {
//     backgroundColor: '#6a11cb',
//   },
//   input: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   resetLink: {
//     color: '#6a11cb',
//     alignSelf: 'center',
//     marginBottom: 20,
//     textDecorationLine: 'underline',
//   },
//   loginButton: {
//     marginTop: 10,
//     width: '50%',
//     paddingVertical: 5,
//     backgroundColor: '#6a11cb',
//     borderRadius: 25,
//     marginHorizontal: 8,
//   },
//   cancelButton: {
//     marginTop: 10,
//     width: '50%',
//     paddingVertical: 3,
//     marginHorizontal: 8,
//     borderRadius: 25,
//   },
//   bottomAction: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 2,
//   }
// });

import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  StatusBar,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import AuthContext from '../AuthContext';
import { 
  Text, 
  TextInput, 
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import AttendanceNotification from '../components/AttendanceAlert';
import AttendanceLoader from '../components/Loader';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('faculty');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const { login, user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      redirectUser(role);
    }
  }, [user,role, authLoading]);

  const redirectUser = () => {
    console.log(role);
    if (role === 'faculty') {
      router.replace('/(faculty)/menu');
      router.back()
    } else if (role === 'student') {
      router.replace('/view');
    }
  };

  const handleLogin = async () => {
    if(!username && !password){
      showNotification( 'Please enter username and password', 'error'  )
      return null 
    }
    
    setIsLoading(true);
   
    try {
        console.log(username,role,password);
        await login(username, password, role);
    
      showNotification(  'Password reset successfully', 'success'  );
    } catch (error) {
      showNotification( 'Invalid credentials', 'error'  )
    } 
      finally {
      setIsLoading(false);
    }
  };

  if (authLoading || user) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="school-outline" size={64} color={theme.colors.primary} />
          <Text style={styles.title}>College ERP</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'faculty' && styles.activeRoleButton]}
              onPress={() => setRole('faculty')}
            >
              <Text style={[styles.roleButtonText, role === 'faculty' && styles.activeRoleButtonText]}>
                Faculty
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'student' && styles.activeRoleButton]}
              onPress={() => setRole('student')}
            >
              <Text style={[styles.roleButtonText, role === 'student' && styles.activeRoleButtonText]}>
                Student
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            disabled={isLoading}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            disabled={isLoading}
          />

          <TouchableOpacity    onPress={() => router.replace('/(auth)/ResetPasswordScreen')}  style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
            labelStyle={styles.loginButtonLabel}
            loading={isLoading}
          >
            Login
          </Button>
        </View>
      </View>
      <AttendanceLoader isVisible={isLoading} />
      
      {notification && (
        <AttendanceNotification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  roleButtonText: {
    color: '#555',
  },
  activeRoleButton: {
    backgroundColor: theme.colors.primary,
  },
  activeRoleButtonText: {
    color: '#fff',
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
  },
  loginButton: {
    marginTop: theme.spacing.md,
  },
  loginButtonContent: {
    height: 48,
  },
  loginButtonLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
  },
});

