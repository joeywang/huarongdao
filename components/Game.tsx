import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Block, BlockProps } from './Block';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from '../hooks/useColorScheme';

const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 5;
const CELL_SIZE = 80;

// Define themes
const themes = {
  light: {
    caocao: 'rgb(240, 245, 229)',
    soldier: 'rgb(146, 179, 165)',
    zhangfei: 'lightblue',
    zhaoyun: 'lightblue',
    huangzhong: 'lightblue',
    machao: 'lightblue',
    guanyu: 'lightgreen',
  },
  dark: {
    caocao: 'rgb(100, 110, 90)',
    soldier: 'rgb(80, 100, 90)',
    zhangfei: 'darkblue',
    zhaoyun: 'darkblue',
    huangzhong: 'darkblue',
    machao: 'darkblue',
    guanyu: 'darkgreen',
  },
};

export function GameBoard() {
  const { t } = useTranslation();
  const [colorScheme, setColorScheme] = useColorScheme();
  const colors = themes[colorScheme === 'dark' ? 'dark' : 'light'];

  const initialBlocks: BlockProps[] = [
    { name: t('blocks.caocao'), top: 0, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE * 2, color: colors.caocao, borderColor: 'red' },
    { name: t('blocks.zhangfei'), top: 0, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: colors.zhangfei, borderColor: 'blue' },
    { name: t('blocks.zhaoyun'), top: 0, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: colors.zhaoyun, borderColor: 'blue' },
    { name: t('blocks.huangzhong'), top: CELL_SIZE * 2, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: colors.huangzhong, borderColor: 'blue' },
    { name: t('blocks.machao'), top: CELL_SIZE * 2, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: colors.machao, borderColor: 'blue' },
    { name: t('blocks.guanyu'), top: CELL_SIZE * 2, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE, color: colors.guanyu, borderColor: 'green' },
    { name: `${t('blocks.soldier')} 1`, top: CELL_SIZE * 3, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 2`, top: CELL_SIZE * 3, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 3`, top: CELL_SIZE * 4, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 4`, top: CELL_SIZE * 4, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
  ];
  const [blocks, setBlocks] = React.useState(initialBlocks);
  const [selectedBlockIndex, setSelectedBlockIndex] = React.useState<number | null>(null);

  const getValidMoves = (blockIndex: number) => {
    const block = blocks[blockIndex];
    const possibleMoves = [
      { dx: 0, dy: -CELL_SIZE },
      { dx: 0, dy: CELL_SIZE },
      { dx: -CELL_SIZE, dy: 0 },
      { dx: CELL_SIZE, dy: 0 },
    ];

    return possibleMoves.filter(move => 
      isValidMove(blocks, blockIndex, block.top + move.dy, block.left + move.dx)
    );
  };

  const handleBlockPress = (index: number) => {
    const validMoves = getValidMoves(index);

    if (validMoves.length === 0) {
      // No valid moves, do nothing or show a message
    } else if (validMoves.length === 1) {
      // Only one valid move, execute it immediately
      moveBlock(index, validMoves[0].dx, validMoves[0].dy);
    } else {
      // Multiple valid moves, enter selection mode
      setSelectedBlockIndex(index);
    }
  };

  const handleBoardPress = (x: number, y: number) => {
    if (selectedBlockIndex === null) return;

    const selectedBlock = blocks[selectedBlockIndex];
    const dx = x - selectedBlock.left;
    const dy = y - selectedBlock.top;

    if (Math.abs(dx) + Math.abs(dy) === CELL_SIZE && 
        isValidMove(blocks, selectedBlockIndex, selectedBlock.top + dy, selectedBlock.left + dx)) {
      moveBlock(selectedBlockIndex, dx, dy);
      setSelectedBlockIndex(null);
    }
  };

  const moveBlock = (index: number, dx: number, dy: number) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[index] = {
        ...newBlocks[index],
        top: newBlocks[index].top + dy,
        left: newBlocks[index].left + dx,
      };
      return newBlocks;
    });
  };

  const isValidMove = (blocks: BlockProps[], index: number, newTop: number, newLeft: number) => {
    const block = blocks[index];
    if (newTop < 0 || newLeft < 0 || 
        newTop + block.height > BOARD_HEIGHT * CELL_SIZE || 
        newLeft + block.width > BOARD_WIDTH * CELL_SIZE) {
      return false;  // Out of bounds
    }

    // Check for collisions with other blocks
    return !blocks.some((otherBlock, i) => 
      i !== index && isOverlapping(
        {top: newTop, left: newLeft, width: block.width, height: block.height},
        otherBlock
      )
    );
  };

  const isOverlapping = (a: BlockProps, b: BlockProps) => {
    return a.left < b.left + b.width &&
           a.left + a.width > b.left &&
           a.top < b.top + b.height &&
           a.top + a.height > b.top;
  };

  return (
    <ThemedView style={styles.board}>
      {Array.from({ length: BOARD_HEIGHT }, (_, row) => (
        Array.from({ length: BOARD_WIDTH }, (_, col) => (
          <TouchableOpacity
            key={`${row}-${col}`}
            style={[
              styles.cell,
              { top: row * CELL_SIZE, left: col * CELL_SIZE }
            ]}
            onPress={() => handleBoardPress(col * CELL_SIZE, row * CELL_SIZE)}
          />
        ))
      ))}
      {blocks.map((block, index) => (
        <Block
          key={block.name}
          {...block}
          onPress={() => handleBlockPress(index)}
          isSelected={index === selectedBlockIndex}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 4 * CELL_SIZE + 4,
    height: 5 * CELL_SIZE + 4,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});