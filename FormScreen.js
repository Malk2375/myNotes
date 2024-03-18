import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const FormScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Normal'); // Priorité par défaut

  // Récupérer les notes précédentes depuis les paramètres de navigation
  const previousNotes = route.params?.notes ?? [];

  const handleSaveNote = () => {
    // Créez une nouvelle note avec les données saisies
    const newNote = {
      id: Math.random().toString(), // Générez un ID unique pour la nouvelle note
      title,
      date: new Date().toISOString(),
      content,
      priority,
    };

    // Ajoutez la nouvelle note à la liste des notes précédentes
    const updatedNotes = [...previousNotes, newNote];

    // Naviguez vers l'écran Dashboard avec la liste mise à jour des notes
    navigation.navigate('Dashboard', { notes: updatedNotes });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Contenu"
        value={content}
        onChangeText={setContent}
        multiline={true}
      />
      <Picker
        style={styles.input} // Appliquez le style input pour maintenir la cohérence
        selectedValue={priority}
        onValueChange={(itemValue, itemIndex) =>
          setPriority(itemValue)
        }>
        <Picker.Item label="Important" value="Important" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Pense bête" value="Pense bête" />
      </Picker>
      <Button title="Enregistrer" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default FormScreen;
