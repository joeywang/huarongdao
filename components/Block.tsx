import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
}

export function Block({ name, top, left, width, height, color, borderColor, onPress }: BlockProps) {
  return (
    <TouchableOpacity
      style={[
        styles.block,
        {
          top,
          left,
          width,
          height,
          backgroundColor: color,
          borderColor,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.blockText}>{name}</ThemedText>
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
});