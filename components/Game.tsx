import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Block, BlockProps } from './Block';

const BOARD_SIZE = 4;
const CELL_SIZE = 80;

const initialBlocks: BlockProps[] = [
  { name: 'Cao Cao', top: 0, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE * 2, color: 'lightcoral', borderColor: 'red' },
  { name: 'Zhang Fei', top: 0, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
  { name: 'Zhao Yun', top: 0, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
  { name: 'Huang Zhong', top: CELL_SIZE * 2, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
  { name: 'Ma Chao', top: CELL_SIZE * 2, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
  { name: 'Guan Yu', top: CELL_SIZE * 2, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE, color: 'lightgreen', borderColor: 'green' },
  { name: 'Soldier 1', top: CELL_SIZE * 3, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: 'lightyellow', borderColor: 'yellow' },
  { name: 'Soldier 2', top: CELL_SIZE * 3, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: 'lightyellow', borderColor: 'yellow' },
  { name: 'Soldier 3', top: CELL_SIZE * 4, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: 'lightyellow', borderColor: 'yellow' },
  { name: 'Soldier 4', top: CELL_SIZE * 4, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: 'lightyellow', borderColor: 'yellow' },
];

export function GameBoard() {
  const [blocks, setBlocks] = React.useState(initialBlocks);
  const handleBlockPress = (index: number) => {
    // TODO: Implement block movement logic
    console.log(`Block ${blocks[index].name} pressed`);
  };

  return (
    <ThemedView style={styles.board}>
      {blocks.map((block, index) => (
        <Block
            key={block.name}
            {...block}
            onPress={() => handleBlockPress(index)}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 4 * CELL_SIZE,
    height: 5 * CELL_SIZE,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});