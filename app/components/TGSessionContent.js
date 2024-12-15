import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Divider } from 'react-native-paper';
import { Calendar, PlusCircle, Trash2 } from 'react-native-feather';

const MemoizedPointInput = React.memo(({ value, onChange, onRemove, canRemove, index }) => (
  <View style={styles.pointInputContainer}>
    <TextInput
      value={value}
      onChangeText={(text) => onChange(index, text)}
      style={styles.pointInput}
      placeholder={`Point ${index + 1}`}
    />
    {canRemove && (
      <Button
        icon={() => <Trash2 size={20} />}
        onPress={() => onRemove(index)}
        mode="text"
      />
    )}
  </View>
));

MemoizedPointInput.displayName = 'MemoizedPointInput';

const TGSessionContent = React.memo(({
  selectedDate,
  setSelectedDate,
  pointInputs,
  setPointInputs,
  tgSessions
}) => {
  const handleAddPoint = React.useCallback(() => {
    setPointInputs(current => [...current, { id: Date.now(), value: '' }]);
  }, [setPointInputs]);

  const handleRemovePoint = React.useCallback((index) => {
    setPointInputs(current => current.filter((_, i) => i !== index));
  }, [setPointInputs]);

  const handlePointChange = React.useCallback((index, newValue) => {
    setPointInputs(current =>
      current.map((point, i) =>
        i === index ? { ...point, value: newValue } : point
      )
    );
  }, [setPointInputs]);

  const sortedTGSessions = React.useMemo(() => {
    return [...tgSessions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [tgSessions]);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>TG Session Details</Title>
        <View style={styles.dateContainer}>
          <Calendar size={20} />
          <TextInput
            label="Session Date"
            value={selectedDate}
            onChangeText={setSelectedDate}
            style={styles.dateInput}
          />
        </View>

        <Divider style={styles.divider} />

        <Title style={styles.sectionTitle}>Points Discussed</Title>
        <View style={styles.pointsContainer}>
          {pointInputs.map((point, index) => (
            <MemoizedPointInput
              key={point.id}
              value={point.value}
              onChange={handlePointChange}
              onRemove={handleRemovePoint}
              canRemove={pointInputs.length > 1}
              index={index}
            />
          ))}
        </View>
        <Button
          mode="contained"
          onPress={handleAddPoint}
          icon={() => <PlusCircle size={20} />}
          style={styles.addButton}
        >
          Add Point
        </Button>

        <Divider style={styles.divider} />

        <Title style={styles.sectionTitle}>Previous TG Sessions</Title>
        <ScrollView style={styles.sessionsScrollView}>
          {sortedTGSessions.length > 0 ? (
            sortedTGSessions.map((session) => (
              <Card key={session.date} style={styles.sessionCard}>
                <Card.Content>
                  <Paragraph style={styles.sessionDate}>
                    Date: {new Date(session.date).toLocaleDateString()}
                  </Paragraph>
                  {session.pointsDiscussed.map((point, pointIndex) => (
                    <Paragraph key={`${session.date}-point-${pointIndex}`} style={styles.sessionPoint}>
                      • {point}
                    </Paragraph>
                  ))}
                </Card.Content>
              </Card>
            ))
          ) : (
            <Paragraph style={styles.noSessionsText}>No previous sessions recorded</Paragraph>
          )}
        </ScrollView>
      </Card.Content>
    </Card>
  );
});

TGSessionContent.displayName = 'TGSessionContent';

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pointsContainer: {
    marginBottom: 16,
  },
  pointInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginTop: 8,
  },
  sessionsScrollView: {
    maxHeight: 300,
  },
  sessionCard: {
    marginBottom: 8,
  },
  sessionDate: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sessionPoint: {
    marginLeft: 16,
  },
  noSessionsText: {
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default TGSessionContent;

