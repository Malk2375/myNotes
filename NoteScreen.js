import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteScreen = ({ route }) => {
  const { note } = route.params;

  // Fonction pour déterminer la couleur de priorité
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Important':
        return '#ff6666'; // Rouge
      case 'Normal':
        return '#a3aeff'; // Bleu
      case 'Pense bête':
        return '#bababa'; // Gris
      default:
        return '#FFFFFF'; // Blanc par défaut
    }
  };

  const priorityColor = getPriorityColor(note.priority);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>Date: {note.date}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={[styles.priority, { color: priorityColor }]}>Priority: {note.priority}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  priority: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 15,
  },
});

export default NoteScreen;
