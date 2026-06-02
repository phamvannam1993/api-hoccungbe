export interface CropBox {
  x: number; // 0-1 normalized
  y: number;
  width: number;
  height: number;
}

export interface EdgePattern {
  top: 'flat' | 'tab' | 'blank';
  right: 'flat' | 'tab' | 'blank';
  bottom: 'flat' | 'tab' | 'blank';
  left: 'flat' | 'tab' | 'blank';
}

export interface PieceMetadata {
  position: number;
  cropBox: CropBox;
  edges: EdgePattern;
}

export function generatePieceMetadata(
  gridRows: number,
  gridCols: number,
): PieceMetadata[] {
  const pieces: PieceMetadata[] = [];
  let position = 0;

  // Generate random edge patterns for inner connections
  // Store as 2D array to ensure matching edges between adjacent pieces
  const edgePatterns: (('tab' | 'blank')[][]) = Array(gridRows)
    .fill(null)
    .map(() =>
      Array(gridCols - 1)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? 'tab' : 'blank')),
    );

  const vEdgePatterns: (('tab' | 'blank')[][]) = Array(gridRows - 1)
    .fill(null)
    .map(() =>
      Array(gridCols)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? 'tab' : 'blank')),
    );

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      // Determine edges
      const top: 'flat' | 'tab' | 'blank' =
        row === 0 ? 'flat' : vEdgePatterns[row - 1][col] === 'tab' ? 'blank' : 'tab';
      const bottom: 'flat' | 'tab' | 'blank' =
        row === gridRows - 1 ? 'flat' : vEdgePatterns[row][col];
      const left: 'flat' | 'tab' | 'blank' =
        col === 0 ? 'flat' : edgePatterns[row][col - 1] === 'tab' ? 'blank' : 'tab';
      const right: 'flat' | 'tab' | 'blank' =
        col === gridCols - 1 ? 'flat' : edgePatterns[row][col];

      pieces.push({
        position,
        cropBox: {
          x: col / gridCols,
          y: row / gridRows,
          width: 1 / gridCols,
          height: 1 / gridRows,
        },
        edges: { top, right, bottom, left },
      });
      position++;
    }
  }

  return pieces;
}
