import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GameBoard } from '@/components/Game';

export default function MainScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Huarongdao Game</ThemedText>
      {/* Game board will be added here */}
      <GameBoard />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});