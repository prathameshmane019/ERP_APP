import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, List, Checkbox } from 'react-native-paper';
import { theme } from '../theme';
 

 
export default function CourseContent ({ contents, selectedContents, setSelectedContents })  {
  const toggleContent = (contentId) => {
    setSelectedContents(prev =>
      prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Course Content</Text>
        {contents.map((content) => (
          <List.Item
            key={content._id}
            title={content.title}
            description={content.description}
            right={() => (
              <Checkbox.Android
                status={selectedContents.includes(content._id) || content.status === "covered" ? 'checked' : 'unchecked'}
                onPress={() => toggleContent(content._id)}
                disabled={content.status === 'covered'}
              />
            )}
          />
        ))}
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
});

