import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import de l'icône Ionicons

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
      <View style={styles.header}>
        <Text style={styles.textContainer}>Liste des notes :</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Form', { notes })}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {notes.map(note => (
        <TouchableOpacity key={note.id} onPress={() => handleNotePress(note)} style={styles.noteContainer}>
          <View style={styles.priorityBorderContainer}>
            <View style={[styles.priorityBorder, { borderColor: getPriorityColor(note.priority) }]}>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.content}>{note.content}</Text>
              {/* <Text style={styles.priority}>Priorité: {note.priority}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Fond blanc
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 'auto', // Aligner le texte à gauche
  },
  addButton: {
    marginLeft: 'auto', // Aligner l'icône à droite
    backgroundColor: '#00B4D8', // Couleur de fond
    borderRadius: 20, // Pour un bouton rond
    width: 70, // Largeur
    height: 50, // Hauteur
    justifyContent: 'center', // Centrer verticalement
    alignItems: 'center', // Centrer horizontalement
  },
  noteContainer: { // Définir une largeur fixe pour chaque note
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ffffff",
  },
  priorityBorderContainer: {
    width: '100%',
    alignItems: 'center', // Centrer le contenu horizontalement
  },
  priorityBorder: {
    width: '100%', // Utilisez une largeur de 100% pour occuper toute la largeur du conteneur parent
    borderWidth: 2,
    borderRadius: 10, // Même rayon que le noteContainer
    borderColor: '#ccc',
    padding: 10, // Ajouter du padding entre le texte et le bord du priorityBorder
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center', // Centrer le titre
    fontSize: 20,
  },
  content: {
    textAlign: 'center', // Centrer le contenu
  },
  priority: {
    textAlign: 'center', // Centrer la priorité
  },
});

export default DashboardScreen;
