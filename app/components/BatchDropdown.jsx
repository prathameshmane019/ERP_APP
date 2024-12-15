import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export function BatchDropdown({ facultyId, instituteId, onSelect, selectedSubject, selectedBatch }) {
  const mockBatches = ['Batch A', 'Batch B', 'Batch C'];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedBatch}
        onValueChange={(itemValue) => onSelect(itemValue)}
        enabled={!!selectedSubject}
      >
        <Picker.Item label="Select Batch" value={null} />
        {mockBatches.map((batch) => (
          <Picker.Item key={batch} label={batch} value={batch} />
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

