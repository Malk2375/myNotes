import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";

const FormScreen = ({ navigation, route }) => {
  const db = SQLite.openDatabase("tuto.db");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, priority TEXT DEFAULT 'Normal', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);",
        [],
        () => console.log("Table 'notes' created successfully with priority column."),
        (txObj, error) => console.log(error)
      );
    });

    const { note } = route.params ?? {};

    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setPriority(note.priority);
    }
  }, [route.params]);

  const priorityColors = {
    Important: "#ff6666",
    Normal: "#a3aeff",
    "Pense bête": "#bababa",
  };

  const saveNote = () => {
    db.transaction((tx) => {
      if (route.params?.note) {
        tx.executeSql(
          "UPDATE notes SET title = ?, description = ?, priority = ? WHERE id = ?",
          [title, description, priority, route.params.note.id],
          () => navigation.navigate("Dashboard"),
          (txObj, err) => console.log(err)
        );
      } else {
        tx.executeSql(
          "INSERT INTO notes (title, description, priority) VALUES (?, ?, ?)",
          [title, description, priority],
          () => navigation.navigate("Dashboard"),
          (txObj, err) => console.log(err)
        );
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Picker
          style={styles.input}
          selectedValue={priority}
          onValueChange={(itemValue, itemIndex) =>
            setPriority(itemValue)
          }>
          <Picker.Item label="Important" value="Important" />
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="Pense bête" value="Pense bête" />
        </Picker>
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: priorityColors[priority] || "#007aff" }]} onPress={saveNote}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FormScreen;
