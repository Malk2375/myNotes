import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';

const DashboardScreen = ({ navigation, route }) => {
  const { notes } = route.params ?? { notes: [] }; // Récupérer les notes depuis les paramètres de navigation ou initialiser à une liste vide

  // Fonction pour naviguer vers l'écran de détails de la note lorsqu'une note est pressée
  const handleNotePress = (note) => {
    navigation.navigate('Note', { note });
  };

  // Fonction pour déterminer la couleur de fond en fonction de la priorité de la note
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Liste des notes :</Text>
      {notes.map(note => (
        <TouchableOpacity key={note.id} onPress={() => handleNotePress(note)}>
          <View style={styles.noteContainer}>
            <View style={[styles.priorityBorder, { borderColor: getPriorityColor(note.priority) }]}>
              <Text style={styles.title}>{note.title}</Text>
              <Text>Contenu: {note.content}</Text>
              <Text>Priorité: {note.priority}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <Button
        title="Ajouter une note"
        onPress={() => navigation.navigate('Form', { notes })} // Naviguer vers l'écran de formulaire en passant les notes existantes
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Fond blanc
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noteContainer: {
    width: '90%', // Définir une largeur fixe pour chaque note
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
  },
  priorityBorder: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});


export default DashboardScreen;
