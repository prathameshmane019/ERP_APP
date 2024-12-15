import React from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
} from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../theme';



export default function  ({
  size = 'large',
  color = theme.colors.primary,
  message='',
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size={size} 
          color={color} 
        />
        {message && (
          <Text style={styles.message}>
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  loadingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});