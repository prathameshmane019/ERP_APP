// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
// import {
//   Provider as PaperProvider,
//   Card,
//   Title,
//   Paragraph,
//   Button,
//   ActivityIndicator,
//   Appbar,
//   Avatar,
//   Divider,
// } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import AuthContext from '../AuthContext';

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// const getCurrentAcademicYear = () => {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();
//   const academicYearStart = currentMonth >= 6 ? currentYear : currentYear - 1;
//   const academicYearEnd = academicYearStart + 1;
//   return `${academicYearStart}-${academicYearEnd}`;
// };

// const getAcademicYears = (count = 5) => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = 0; i < count; i++) {
//     const startYear = currentYear - i;
//     const endYear = startYear + 1;
//     years.push(`${startYear}-${endYear}`);
//   }
//   return years;
// };

// export default function ProfileScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext);
//   const [currentYear, setCurrentYear] = useState(getCurrentAcademicYear());
//   const [selectedSemester, setSelectedSemester] = useState(user?.sem || "sem1");
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   // console.log("User Profile:",user);
  
//   const loadSubjects = useCallback(async () => {
//     if (!user || !user._id) return;

//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/api/v2/app-subjects`, {
//         params: {
//           facultyId: user._id,
//           academicYear: currentYear,
//           sem: selectedSemester,
//           institute:user.institute
//         }
//       });
// console.log(response.data);

//       const fetchedSubjects = response.data || [];
//       setSubjects(fetchedSubjects);
      
//       // Cache subjects in AsyncStorage
//       await AsyncStorage.setItem(
//         `faculty_subjects_${user.id}_${currentYear}_${selectedSemester}`, 
//         JSON.stringify(fetchedSubjects)
//       );
//     } catch (error) {
//       console.error('Error loading subjects:', error);
//       // Attempt to retrieve cached subjects
//       try {
//         const cachedSubjects = await AsyncStorage.getItem(
//           `faculty_subjects_${user.id}_${currentYear}_${selectedSemester}`
//         );
//         if (cachedSubjects) {
//           setSubjects(JSON.parse(cachedSubjects));
//         }
//       } catch (storageError) {
//         console.error('Error retrieving cached subjects:', storageError);
//       }
//       alert('Failed to load subjects. Please check your connection.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [user, currentYear, selectedSemester]);

//   useEffect(() => {
//     loadSubjects();
//   }, [loadSubjects]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadSubjects();
//   }, [loadSubjects]);

//   const handleLogout = async () => {
//     await logout();
//   };

//   const renderProfileInfo = () => {
//     if (user.role === 'faculty') {
//       return (
//         <>
//           <Paragraph>Faculty ID: {user.id}</Paragraph>
//           <Paragraph>Email: {user.email}</Paragraph>
//           <Paragraph>Department: {user.department}</Paragraph>
//           <Paragraph>Current Year: {user.currentYear || 'N/A'}</Paragraph>
//           <Paragraph>Current Semester: {user.sem || 'N/A'}</Paragraph>
//         </>
//       );
//     }
//     return null;
//   };

//   return (
//     <PaperProvider>
//       <Appbar.Header>
//         <Appbar.Content title="Profile" />
//         <Appbar.Action icon="logout" onPress={handleLogout} />
//       </Appbar.Header>
//       <ScrollView 
//         contentContainerStyle={styles.container}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//           />
//         }
//       >
//         <Card style={styles.card}>
//           <Card.Content>
//             <View style={styles.avatarContainer}>
//               <Avatar.Icon size={80} icon="account" />
//             </View>
//             <Title style={styles.name}>{user?.name}</Title>
//             <Paragraph style={styles.role}>{user?.role}</Paragraph>
//             <Divider style={styles.divider} />
//             {renderProfileInfo()}
//           </Card.Content>
//         </Card>

//         <Card style={styles.card}>
//           <Card.Content>
//             <Title>Academic Information</Title>
//             <View style={styles.pickerContainer}>
//               <Paragraph>Academic Year:</Paragraph>
//               <Picker
//                 selectedValue={currentYear}
//                 onValueChange={(itemValue) => setCurrentYear(itemValue)}
//                 style={styles.picker}
//               >
//                 {getAcademicYears().map((year) => (
//                   <Picker.Item key={year} label={year} value={year} />
//                 ))}
//               </Picker>
//             </View>
//             <View style={styles.pickerContainer}>
//               <Paragraph>Semester:</Paragraph>
//               <Picker
//                 selectedValue={selectedSemester}
//                 onValueChange={(itemValue) => setSelectedSemester(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Semester 1" value="sem1" />
//                 <Picker.Item label="Semester 2" value="sem2" />
//               </Picker>
//             </View>
//           </Card.Content>
//         </Card>

//         <Card style={styles.card}>
//           <Card.Content>
//             <Title>Assigned Subjects</Title>
//             {loading ? (
//               <ActivityIndicator size="large" style={styles.loadingIndicator} />
//             ) : subjects.length > 0 ? (
//               subjects.map((subject, index) => (
//                 <View key={index} style={styles.subjectItem}>
//                   <Paragraph style={styles.subjectName}>{subject.name}</Paragraph>
//                   <Paragraph style={styles.subjectDetails}>
//                     {subject.id} | {subject.class.id || 'No Class'} | {subject.subType}
//                   </Paragraph>
//                 </View>
//               ))
//             ) : (
//               <Paragraph>No subjects assigned for the selected academic year and semester.</Paragraph>
//             )}
//           </Card.Content>
//         </Card>
//       </ScrollView>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   card: {
//     marginBottom: 16,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   name: {
//     textAlign: 'center',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   role: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 16,
//   },
//   divider: {
//     marginVertical: 16,
//   },
//   pickerContainer: {
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   loadingIndicator: {
//     marginTop: 16,
//   },
//   subjectItem: {
//     marginBottom: 12,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   subjectName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subjectDetails: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import {
  Provider as PaperProvider,
  Card,
  Title,
  Text,
  Button,
  ActivityIndicator,
  Appbar,
  Avatar,
  Divider,
  TextInput,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../AuthContext';
import { theme } from '../theme';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getCurrentAcademicYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const academicYearStart = currentMonth >= 6 ? currentYear : currentYear - 1;
  const academicYearEnd = academicYearStart + 1;
  return `${academicYearStart}-${academicYearEnd}`;
};

const getAcademicYears = (count = 5) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < count; i++) {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    years.push(`${startYear}-${endYear}`);
  }
  return years;
};

export default function ProfileScreen({ navigation }) {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [currentYear, setCurrentYear] = useState(getCurrentAcademicYear());
  const [selectedSemester, setSelectedSemester] = useState(user?.sem || "sem1");

  const [loading, setLoading] = useState(false);

  // Profile Edit Modal State
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    currentYear: user?.currentYear || '',
    sem: user?.sem || 'sem1'
  });


  const handleSaveProfile = async () => {
    try {
      // Validate input
      if (!editedProfile.name.trim()) {
        Alert.alert('Error', 'Name cannot be empty');
        return;
      }

      // Call update user API
      const updatedUser = await updateUser({
        ...user,
        ...editedProfile
      });

      // Close modal
      setIsEditModalVisible(false);
      
      // Optional: Show success message
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const renderEditModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEditModalVisible}
      onRequestClose={() => setIsEditModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Title style={styles.modalTitle}>Edit Profile</Title>
          
          <TextInput
            label="Name"
            value={editedProfile.name}
            onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Email"
            value={editedProfile.email}
            onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
          />
          
          <TextInput
            label="Department"
            value={editedProfile.department}
            onChangeText={(text) => setEditedProfile({...editedProfile, department: text})}
            style={styles.input}
            mode="outlined"
          />
          
          <View style={styles.pickerContainer}>
            <Text>Academic Year</Text>
            <Picker
              selectedValue={editedProfile.currentYear}
              onValueChange={(itemValue) => setEditedProfile({...editedProfile, currentYear: itemValue})}
              style={styles.picker}
            >
              {getAcademicYears().map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Text>Semester</Text>
            <Picker
              selectedValue={editedProfile.sem}
              onValueChange={(itemValue) => setEditedProfile({...editedProfile, sem: itemValue})}
              style={styles.picker}
            >
              <Picker.Item label="Semester 1" value="sem1" />
              <Picker.Item label="Semester 2" value="sem2" />
            </Picker>
          </View>
          
          <View style={styles.modalButtonContainer}>
            <Button 
              mode="outlined" 
              onPress={() => setIsEditModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button 
              mode="contained" 
              onPress={handleSaveProfile}
              style={styles.modalButton}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="logout" onPress={() => logout()} />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => setIsEditModalVisible(true)}
            >
              <Icon name="pencil" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Title style={styles.name}>{user?.name}</Title>
            <Text style={styles.role}>{user?.role}</Text>
            
            <Divider style={styles.divider} />
            
            <View style={styles.detailRow}>
              <Icon name="email" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>{user?.email}</Text>
            </View>
            
            {user.department && (
              <View style={styles.detailRow}>
                <Icon name="office-building" size={20} style={styles.detailIcon} />
                <Text style={styles.detailText}>{user.department}</Text>
              </View>
            )}
            
            <View style={styles.detailRow}>
              <Icon name="calendar" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Academic Year: {user?.currentYear || 'Not Set'}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Icon name="book-open" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Semester: {user?.sem === 'sem1' ? 'Semester 1' : 'Semester 2'}
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.subjectsCard}>
          <Card.Content>
            <View style={styles.subjectHeader}>
              <Title>Assigned Subjects</Title>
            </View>
            
            {loading ? (
              <ActivityIndicator size="large" style={styles.loadingIndicator} />
            ) : user.subjects.length > 0 ? (
              user.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectItem}>
                  <View style={styles.subjectDetails}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.subjectCode}>
                      {subject.id} | {subject.class.id || 'No Class'} | {subject.subType}
                    </Text>
                  </View>
                  <Icon name="book-open-variant" size={24} color="#666" />
                </View>
              ))
            ) : (
              <Text style={styles.noSubjectsText}>
                No subjects assigned for the selected academic year and semester.
              </Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {renderEditModal()}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
  },
  avatar: {
    backgroundColor:theme.colors.primary,
  },
  editProfileButton: {
    position: 'absolute',
    right: 16,
    top: 10,
    backgroundColor:theme.colors.primary,
    borderRadius: 20,
    width: 40,
    color:theme.colors.primaryDark,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  role: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  detailIcon: {
    marginRight: 10,
    color:theme.colors.primaryDark,
  },
  detailText: {
    fontSize: 16,
    
  },
  divider: {
    marginVertical: 16,
  },
  subjectsCard: {
    borderRadius: 12,
    elevation: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectFilters: {
    flexDirection: 'row',
  },
  yearPicker: {
    width: 120,
  },
  semPicker: {
    width: 100,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subjectDetails: {
    flex: 1,
    marginRight: 10,
    
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectCode: {
    fontSize: 14,
    color: '#666',
  },
  noSubjectsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    width: '48%',
  }
});