import React from "react";
import { Chessboard } from "react-chessboard";

import NumberNotations from "./NumberNotations";
import LetterNotations from "./LetterNotations";

const BoardArea: React.FC<{
  snapshotRef: React.RefObject<HTMLDivElement | null>;
}> = ({ snapshotRef }) => {
  return (
    <div className="bg-neutral-800 p-3 text-[16px] sm:p-3 sm:text-[16px] md:p-4 md:text-[17px] lg:col-span-4 lg:h-fit lg:p-4 lg:text-[18px] xl:p-5 xl:text-[19px] 2xl:p-6 2xl:text-[20px]">
      {/* Snapshot Container */}
      <div ref={snapshotRef} className="flex flex-col gap-1">
        <div className="flex gap-2">
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
