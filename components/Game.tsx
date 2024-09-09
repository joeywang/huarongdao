import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export function GameBoard() {
  return (
    <ThemedView style={styles.board}>
      <ThemedText>Game board goes here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});