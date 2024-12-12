import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../theme';
import { useRouter } from 'expo-router';

export default function Header ({ title }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => router.replace('')}
        iconColor={theme.colors.surface}
      />
      <Text variant="headlineMedium" style={styles.title}>{title}</Text>
      <IconButton
        icon="cloud-upload"
        size={24}
        onPress={() => {}}
        iconColor={theme.colors.surface}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.primary,
    elevation: 4,
  },
  title: {
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
});

