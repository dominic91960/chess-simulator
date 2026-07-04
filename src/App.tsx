import { useCallback, useMemo, useRef, useState } from "react";
import {
  Chessboard,
  ChessboardProvider,
  SparePiece,
  type ChessboardOptions,
  type PieceDropHandlerArgs,
  type PositionDataType,
} from "react-chessboard";
import { toPng } from "html-to-image";

const WHITE_PIECES = ["wK", "wQ", "wR", "wB", "wN", "wP"];
const BLACK_PIECES = ["bK", "bQ", "bR", "bB", "bN", "bP"];

const secondaryButton =
  "inline-flex h-11 items-center justify-center gap-2 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-stone-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 active:translate-y-0";

function App() {
  const [position, setPosition] = useState<PositionDataType>({});
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [isExporting, setIsExporting] = useState(false);
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
      onSquareRightClick: ({ square }) => removePiece(square),
      allowDragging: true,
      allowDragOffBoard: true,
      showAnimations: false,
      showNotation: true,
      lightSquareStyle: { backgroundColor: "#e9dec8" },
      darkSquareStyle: { backgroundColor: "#668078" },
      boardStyle: {
        borderRadius: "6px",
        boxShadow: "0 20px 50px rgb(41 37 36 / 0.2)",
      },
    }),
    [handlePieceDrop, orientation, position, removePiece],
  );

  const exportPng = async () => {
    const node = snapshotRef.current;
    if (!node || isExporting) return;

    setIsExporting(true);

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#f5f1e8",
      });

      const link = document.createElement("a");
      link.download = `chess-position-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const pieceTray = (label: string, pieces: string[]) => (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold tracking-[0.16em] text-stone-500 uppercase">
          {label}
        </p>
        <span className="text-[11px] text-stone-400">Drag to place</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5 lg:grid-cols-2">
        {pieces.map((piece) => (
          <div
            className="aspect-square min-w-0 rounded-lg border border-stone-200/80 bg-stone-100 p-1 shadow-inner transition hover:border-emerald-800/30 hover:bg-emerald-50"
            key={piece}
          >
            <SparePiece pieceType={piece} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#ebe7de] text-stone-900 antialiased">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ChessboardProvider options={boardOptions}>
          <section className="grid items-start gap-5 lg:grid-cols-[10rem_minmax(0,45rem)] xl:grid-cols-[11rem_minmax(0,45rem)_minmax(12rem,1fr)]">
            <aside className="rounded-2xl border border-stone-300/80 bg-[#f7f4ed] p-3 shadow-[0_8px_30px_rgb(41_37_36/0.06)] sm:p-4 lg:sticky lg:top-6">
              <div className="space-y-4">
                {pieceTray("White", WHITE_PIECES)}
                <div className="h-px bg-stone-200" />
                {pieceTray("Black", BLACK_PIECES)}
              </div>
            </aside>

            <div className="min-w-0">
              <div
                className="rounded-xl bg-[#f5f1e8] p-2 shadow-[0_24px_70px_rgb(41_37_36/0.16)] ring-1 ring-stone-900/10 sm:p-4"
                ref={snapshotRef}
              >
                <Chessboard />
              </div>
            </div>

            <aside className="rounded-2xl border border-stone-300/80 bg-white/50 p-5">
              <div className="mb-5 hidden xl:block">
                <p className="text-xs font-bold tracking-[0.16em] text-stone-500 uppercase">
                  Quick guide
                </p>
                <ol className="mt-4 space-y-4">
                  {[
                    ["01", "Drag a piece from the library onto any square."],
                    [
                      "02",
                      "Move pieces freely or drop them outside to remove.",
                    ],
                    ["03", "Flip the view, then export a high-resolution PNG."],
                  ].map(([number, text]) => (
                    <li className="flex gap-3" key={number}>
                      <span className="mt-0.5 text-xs font-bold text-emerald-800">
                        {number}
                      </span>
                      <p className="text-sm leading-6 text-stone-600">{text}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 rounded-xl bg-stone-900 p-4 text-stone-100">
                  <p className="text-xs font-bold tracking-wider text-stone-400 uppercase">
                    Shortcut
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    Right-click a square to remove its piece instantly.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <button
                    className={secondaryButton}
                    onClick={() => setPosition({})}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m3 0-1 13H7L6 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                    Clear
                  </button>

                  <button
                    className={secondaryButton}
                    onClick={() =>
                      setOrientation((current) =>
                        current === "white" ? "black" : "white",
                      )
                    }
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4 8h12m0 0-3-3m3 3-3 3m7 5H8m0 0 3-3m-3 3 3 3"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                    Flip
                  </button>
                </div>

                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
                  disabled={isExporting}
                  onClick={exportPng}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                  {isExporting ? "Rendering…" : "Export 4× PNG"}
                </button>
              </div>
            </aside>
          </section>
        </ChessboardProvider>
      </div>
    </main>
  );
}

export default App;
