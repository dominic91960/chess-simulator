import { fenStringToPositionObject } from "react-chessboard";

export const WHITE_PIECES = ["wP", "wN", "wB", "wR", "wQ", "wK"];

export const BLACK_PIECES = ["bP", "bN", "bB", "bR", "bQ", "bK"];

export const STARTING_POSITION = fenStringToPositionObject(
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  8,
  8,
);
