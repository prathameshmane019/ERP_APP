import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../theme';

export const CustomButton = ({ 
  mode = 'contained', 
  style, 
  labelStyle, 
  onPress, 
  children,
  ...props 
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      mode === 'outlined' && styles.outlinedButton,
      style
    ]}
    onPress={onPress}
    {...props}
  >
    <Text 
      style={[
        styles.label, 
        mode === 'outlined' && styles.outlinedLabel,
        labelStyle
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  outlinedLabel: {
    color: theme.colors.primary,
  },
});