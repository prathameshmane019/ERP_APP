import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../theme';



export const SubmitAttendance = ({ onSubmit, loading }) => {
  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      loading={loading}
      disabled={loading}
      style={styles.button}
    >
      Submit Attendance
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});

