import { useCallback, useMemo, useRef, useState } from "react";

import {
  ChessboardProvider,
  type ChessboardOptions,
  type PieceDropHandlerArgs,
  type PositionDataType,
} from "react-chessboard";

import DragMenu from "./components/DragMenu";
import BoardArea from "./components/BoardArea";
import ButtonArea from "./components/ButtonArea";
import { STARTING_POSITION } from "./lib/constants";

function App() {
  const [turn, setTurn] = useState<"white" | "black" | "none">("none");
  const [position, setPosition] = useState<PositionDataType>(STARTING_POSITION);
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [highlightedSquares, setHighlightedSquares] = useState<Set<string>>(
    new Set(),
  );

  const snapshotRef = useRef<HTMLDivElement>(null);

  const removePiece = useCallback((square: string) => {
    setPosition((current) => {
      const next = { ...current };
      delete next[square];
      return next;
    });
  }, []);

  const handlePieceDrop = useCallback(
    ({ piece, sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
      if (!targetSquare) {
        if (!piece.isSparePiece) {
          removePiece(sourceSquare);
        }

        return true;
      }

      setPosition((current) => {
        const next = { ...current };

        if (!piece.isSparePiece) {
          delete next[sourceSquare];
        }

        next[targetSquare] = { pieceType: piece.pieceType };
        return next;
      });

      return true;
    },
    [removePiece],
  );

  const boardOptions = useMemo<ChessboardOptions>(
    () => ({
      id: "snapshot-board",
      position,
      boardOrientation: orientation,
      onPieceDrop: handlePieceDrop,
      onSquareClick: ({ square }) => {
        setHighlightedSquares((current) => {
          const next = new Set(current);
          if (next.has(square)) {
            next.delete(square);
          } else {
            next.add(square);
          }
          return next;
        });
      },
      onSquareRightClick: ({ square }) => removePiece(square),
      allowDragging: true,
      allowDragOffBoard: true,
      showAnimations: false,
      showNotation: false,
      boardStyle: { border: "6px solid black" },
      lightSquareStyle: { backgroundColor: "#FFFFFF" },
      darkSquareStyle: { backgroundColor: "#D3D3D3" },
      squareStyles: Object.fromEntries(
        Array.from(highlightedSquares).map((square) => [
          square,
          {
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.4) 0 8px, transparent 8px 24px)",
          },
        ]),
      ),
    }),
    [handlePieceDrop, orientation, position, removePiece, highlightedSquares],
  );

  return (
    <ChessboardProvider options={boardOptions}>
      <main className="font-primary p-3 text-white antialiased sm:p-3 md:p-4 lg:p-4 xl:p-5 2xl:p-6">
        <div className="container mx-auto flex flex-col gap-3 sm:gap-3 md:gap-4 lg:grid lg:grid-cols-6 lg:gap-4 xl:gap-5 2xl:gap-6">
          {/* Drag and Drop pieces */}
          <DragMenu />

          {/* Chessboard Area */}
          <BoardArea snapshotRef={snapshotRef} turn={turn} />

          {/* Instructions and Buttons  */}
          <ButtonArea
            turn={turn}
            setTurn={setTurn}
            snapshotRef={snapshotRef}
            setOrientation={setOrientation}
            setPosition={setPosition}
          />
        </div>
      </main>
    </ChessboardProvider>
  );
}

export default App;
