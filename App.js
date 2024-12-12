// import React, { useEffect } from 'react';
// import { View, StyleSheet, Image, StatusBar } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { useContext } from 'react';
// import AuthContext from './app/AuthContext';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// const SplashScreen = () => {
//   const router = useRouter();
//   const { user, loading } = useContext(AuthContext);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       // If not loading and no user, navigate to login
//       if (!loading && !user) {
//         console.log("no user found");
        
//         router.replace('/app/(auth)/login');
//       } 
//       // If user exists, navigate to module selection
//       else if (!loading && user) {
//         router.replace(`/app/${user?.role}`);
//       }
//     };
//     // Add a minimum splash screen duration
//     const splashTimer = setTimeout(() => {
//       checkAuthStatus();
//     }, 2000); // 2 seconds minimum display time

//     return () => clearTimeout(splashTimer);
//   }, [loading, user]);

//   return (
//     <LinearGradient
//       colors={['#6a11cb', '#2575fc']}
//       style={styles.container}
//     >
//       <StatusBar barStyle="light-content" />
//       <View style={styles.logoContainer}>
//         <Image 
//           source={require('./assets/login.png')} 
//           style={styles.logo} 
//           resizeMode="contain"
//         />
//         <Icon
//             name={"school"} 
//             size={50} 
//             color="#fff" 
//             style={styles.moduleIcon}
//               />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#6a11cb',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 250,
//     height: 150,
//     marginBottom: 50,
//   },
//   illustration: {
//     width: 300,
//     height: 300,
//   },
// });

// export default SplashScreen;