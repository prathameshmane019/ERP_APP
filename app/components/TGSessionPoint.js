import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, IconButton } from 'react-native-paper';
import { theme } from '../theme';
 

export const TGSessionPoints  = ({ pointsDiscussed, setPointsDiscussed }) => {
  const addPoint = () => {
    setPointsDiscussed([...pointsDiscussed, '']);
  };

  const removePoint = (index) => {
    const newPoints = pointsDiscussed.filter((_, i) => i !== index);
    setPointsDiscussed(newPoints.length ? newPoints : ['']);
  };

  const updatePoint = (index, text) => {
    const newPoints = [...pointsDiscussed];
    newPoints[index] = text;
    setPointsDiscussed(newPoints);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>TG Session Points</Text>
        {pointsDiscussed.map((point, index) => (
          <View key={index} style={styles.pointInputContainer}>
            <TextInput
              value={point}
              onChangeText={(text) => updatePoint(index, text)}
              style={styles.pointInput}
              placeholder={`Point ${index + 1}`}
            />
            <IconButton
              icon="close-circle"
              size={20}
              onPress={() => removePoint(index)}
            />
          </View>
        ))}
        <Button
          mode="contained"
          onPress={addPoint}
          style={styles.addButton}
        >
          Add Point
        </Button>
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
  pointInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pointInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  addButton: {
    marginTop: theme.spacing.md,
  },
});

