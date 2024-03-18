import React from 'react';
import { View, Text } from 'react-native';

const NoteScreen = ({ route }) => {
  const { note } = route.params;

  return (
    <View>
      <Text>Title: {note.title}</Text>
      <Text>Date: {note.date}</Text>
      <Text>Content: {note.content}</Text>
      <Text>Priority: {note.priority}</Text>
    </View>
  );
};

export default NoteScreen;
