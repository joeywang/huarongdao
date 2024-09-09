import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GameBoard } from '@/components/Game';
import { useTranslation } from 'react-i18next';
export default function MainScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      {/* game header at the very top */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">{t('game.title')}</ThemedText>
      </ThemedView>
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
  header: {
    padding: 30,
  },
});