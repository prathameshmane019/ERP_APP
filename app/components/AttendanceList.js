import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Checkbox, Divider } from 'react-native-paper';
import { theme } from '../theme';
 
export default function AttendanceList ({ students, selectedKeys, setSelectedKeys })  {
  const toggleStudent = (studentId) => {
    setSelectedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentRow}>
      <Text style={styles.rollNumber}>{item.rollNumber}</Text>
      <Text style={styles.studentName}>{item.name}</Text>
      <Checkbox.Android
        status={selectedKeys.has(item._id) ? 'checked' : 'unchecked'}
        onPress={() => toggleStudent(item._id)}
      />
    </View>
  );

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Students List</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.rollNumber, styles.headerText]}>Roll No.</Text>
          <Text style={[styles.studentName, styles.headerText]}>Name</Text>
          <Text style={styles.headerText}>Present</Text>
        </View>
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={() => (
            <View style={styles.summary}>
              <Text style={styles.summaryItem}>Total: {students.length}</Text>
              <Text style={styles.summaryItem}>Present: {selectedKeys.size}</Text>
              <Text style={styles.summaryItem}>Absent: {students.length - selectedKeys.size}</Text>
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.md,
    elevation: 4,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  rollNumber: {
    width: 60,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  studentName: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
  },
  summaryItem: {
    fontWeight: 'bold',
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
});
