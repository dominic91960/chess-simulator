import React from "react";
import { Chessboard } from "react-chessboard";

import NumberNotations from "./NumberNotations";
import LetterNotations from "./LetterNotations";

const BoardArea: React.FC<{
  snapshotRef: React.RefObject<HTMLDivElement | null>;
}> = ({ snapshotRef }) => {
  return (
    <div
      ref={snapshotRef}
      className="bg-neutral-800 p-2 text-[16px] sm:text-[16px] md:text-[17px] lg:col-span-4 lg:h-fit lg:text-[18px] xl:text-[19px] 2xl:text-[20px]"
    >
      <div className="flex flex-col gap-2">
        {/* Letter Notations */}
        <LetterNotations />

        <div className="flex gap-2">
          {/* Number Notations */}
          <NumberNotations />

          {/* Chessboard */}
          <Chessboard />

          {/* Number Notations */}
          <NumberNotations />
        </div>

        {/* Letter Notations */}
        <LetterNotations />
      </div>
    </div>
  );
};

export default BoardArea;
