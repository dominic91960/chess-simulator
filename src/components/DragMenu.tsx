import { SparePiece } from "react-chessboard";
import { BLACK_PIECES, WHITE_PIECES } from "../lib/constants";

const DragMenu = () => {
  return (
    <aside className="sticky top-3 grid h-fit grid-cols-1 gap-2 bg-neutral-800 p-2 sm:top-3 md:top-4 lg:top-4 lg:h-fit lg:grid-cols-2 xl:top-5 2xl:top-6">
      {/* White Pieces */}
      <div className="grid grid-cols-6 gap-2 lg:grid-cols-1">
        {WHITE_PIECES.map((piece) => (
          <div
            className="transition-default aspect-square bg-neutral-700 hover:bg-neutral-600"
            key={piece}
          >
            <SparePiece pieceType={piece} />
          </div>
        ))}
      </div>

      {/* Black Pieces */}
      <div className="grid grid-cols-6 gap-2 lg:grid-cols-1">
        {BLACK_PIECES.map((piece) => (
          <div
            className="transition-default aspect-square bg-white hover:bg-neutral-300"
            key={piece}
          >
            <SparePiece pieceType={piece} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DragMenu;
