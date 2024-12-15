// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Text } from 'react-native-paper';
// import { theme } from '../theme';

// export default function SubjectSelector  ({ selectedSubject, setSelectedSubject, selectedBatch, setSelectedBatch, subjectDetails }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Subject</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedSubject}
//           onValueChange={setSelectedSubject}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Subject" value={null} />
//           {subjectDetails?.subjects.map((subject) => (
//             <Picker.Item key={subject._id} label={subject.name} value={subject._id} />
//           ))}
//         </Picker>
//       </View>

//       {subjectDetails && subjectDetails.batch && subjectDetails.batch.length > 0 && (
//         <>
//           <Text style={styles.label}>Select Batch</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedBatch}
//               onValueChange={setSelectedBatch}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Batch" value={null} />
//               {subjectDetails.batch.map((batch) => (
//                 <Picker.Item key={batch} label={`Batch ${batch}`} value={batch} />
//               ))}
//             </Picker>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: theme.spacing.md,
//   },
//   label: {
//     fontSize: theme.fontSize.md,
//     fontWeight: '500',
//     marginBottom: theme.spacing.xs,
//     color: theme.colors.text,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     borderRadius: theme.borderRadius.md,
//     overflow: 'hidden',
//     marginBottom: theme.spacing.sm,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
// });

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export function SubjectDropdown({ facultyId, instituteId, onSelect, selectedSubject, onSubjectTypeChange }) {
  // In a real app, you'd fetch subjects from an API
  const mockSubjects = [
    { _id: 'subject1', name: 'Mathematics', type: 'theory' },
    { _id: 'subject2', name: 'Physics', type: 'practical' },
    { _id: 'subject3', name: 'Chemistry', type: 'tg' },
  ];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue) => {
          onSelect(itemValue);
          const selectedSubjectDetails = mockSubjects.find(subject => subject._id === itemValue);
          if (selectedSubjectDetails) {
            onSubjectTypeChange(selectedSubjectDetails.type);
          }
        }}
      >
        <Picker.Item label="Select Subject" value="" />
        {mockSubjects.map((subject) => (
          <Picker.Item key={subject._id} label={subject.name} value={subject._id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

