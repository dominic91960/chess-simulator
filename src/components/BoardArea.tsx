import React from "react";
import { Chessboard } from "react-chessboard";

import NumberNotations from "./NumberNotations";
import LetterNotations from "./LetterNotations";

const BoardArea: React.FC<{
  snapshotRef: React.RefObject<HTMLDivElement | null>;
}> = ({ snapshotRef }) => {
  return (
    <div className="bg-neutral-800 p-2 text-[24px] sm:text-[27px] md:text-[31px] lg:col-span-4 lg:h-fit lg:text-[36px] xl:text-[42px] 2xl:text-[48px]">
      <div ref={snapshotRef}>
        <div className="relative bg-white ps-[1.1em] pb-[1.1em]">
          {/* Number Notations */}
          <NumberNotations />

          {/* Chessboard */}
          <Chessboard />

          {/* Letter Notations */}
          <LetterNotations />
        </div>
      </div>
    </div>
  );
};

export default BoardArea;
