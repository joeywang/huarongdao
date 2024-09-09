import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Block, BlockProps } from './Block';
import { useTranslation } from 'react-i18next';



const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 5;
const CELL_SIZE = 80;


export function GameBoard() {

  const { t } = useTranslation();
  const colors = {
    caocao: 'rgb(240, 245, 229)',
    soldier: 'rgb(146, 179, 165)',
  }
  const initialBlocks: BlockProps[] = [
    { name: t('blocks.caocao'), top: 0, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE * 2, color: colors.caocao, borderColor: 'red' },
    { name: t('blocks.zhangfei'), top: 0, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
    { name: t('blocks.zhaoyun'), top: 0, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
    { name: t('blocks.huangzhong'), top: CELL_SIZE * 2, left: 0, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
    { name: t('blocks.machao'), top: CELL_SIZE * 2, left: CELL_SIZE * 3, width: CELL_SIZE, height: CELL_SIZE * 2, color: 'lightblue', borderColor: 'blue' },
    { name: t('blocks.guanyu'), top: CELL_SIZE * 2, left: CELL_SIZE, width: CELL_SIZE * 2, height: CELL_SIZE, color: 'lightgreen', borderColor: 'green' },
    { name: `${t('blocks.soldier')} 1`, top: CELL_SIZE * 3, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 2`, top: CELL_SIZE * 3, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 3`, top: CELL_SIZE * 4, left: CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
    { name: `${t('blocks.soldier')} 4`, top: CELL_SIZE * 4, left: CELL_SIZE * 2, width: CELL_SIZE, height: CELL_SIZE, color: colors.soldier, borderColor: 'yellow' },
  ];
  const [blocks, setBlocks] = React.useState(initialBlocks);

  const handleBlockPress = (index: number) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[index];
      const possibleMoves = [
        { dx: 0, dy: -CELL_SIZE },  // Up
        { dx: 0, dy: CELL_SIZE },   // Down
        { dx: -CELL_SIZE, dy: 0 },  // Left
        { dx: CELL_SIZE, dy: 0 },   // Right
      ];

      // Shuffle the possibleMoves array
      for (let i = possibleMoves.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possibleMoves[i], possibleMoves[j]] = [possibleMoves[j], possibleMoves[i]];
      }

      for (const move of possibleMoves) {
        const newTop = block.top + move.dy;
        const newLeft = block.left + move.dx;

        if (isValidMove(newBlocks, index, newTop, newLeft)) {
          block.top = newTop;
          block.left = newLeft;
          return newBlocks;
        }
      }

      return prevBlocks;  // No valid move found
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