import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { theme } from '../theme';

export const SessionSelector = ({ availableSessions, selectedSessions, setSelectedSessions }) => {
  const handleSessionToggle = (session) => {
    setSelectedSessions(prevSessions => 
      prevSessions.includes(session)
        ? prevSessions.filter(s => s !== session)
        : [...prevSessions, session]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Sessions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {availableSessions.map(session => (
          <Checkbox.Item
            key={session}
            label={`${session}`}
            status={selectedSessions.includes(session) ? 'checked' : 'unchecked'}
            onPress={() => handleSessionToggle(session)}
            style={styles.checkbox}
            labelStyle={styles.checkboxLabel}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  scrollView: {
    flexGrow: 0,
  },
  checkbox: {
    paddingHorizontal: theme.spacing.sm,
  },
  checkboxLabel: {
    fontSize: theme.fontSize.sm,
  },
});

