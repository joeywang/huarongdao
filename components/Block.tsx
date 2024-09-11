import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export interface BlockProps {
  name: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
  borderColor: string;
  onPress?: () => void;
  isSelected?: boolean;
}

export function Block({ name, top, left, width, height, color, borderColor, onPress, isSelected }: BlockProps) {
  return (
    <TouchableOpacity
      style={[
        styles.block,
        { top, left, width, height, backgroundColor: color, borderColor }
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.blockText}>{name}</ThemedText>
      {isSelected && <View style={styles.highlight} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  blockText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White overlay
    borderRadius: 5,
  },
});