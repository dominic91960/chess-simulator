import React from "react";
import { Chessboard } from "react-chessboard";

import NumberNotations from "./NumberNotations";
import LetterNotations from "./LetterNotations";
import { cn } from "../lib/utils";

const BoardArea: React.FC<{
  snapshotRef: React.RefObject<HTMLDivElement | null>;
  turn: "white" | "black" | "none";
}> = ({ snapshotRef, turn }) => {
  return (
    <div className="bg-neutral-800 p-2 text-[24px] sm:text-[27px] md:text-[31px] lg:col-span-4 lg:h-fit lg:text-[36px] xl:text-[42px] 2xl:text-[48px]">
      <div ref={snapshotRef}>
        <div className="relative bg-white p-[0.1em] px-[1.5em] pb-[1.5em]">
          {/* Number Notations */}
          <NumberNotations />

          {/* Chessboard */}
          <Chessboard />

          {/* Turn Indicator */}
          {turn !== "none" && (
            <div className="absolute top-0 right-0 bottom-0 mt-[0.1em] mb-[1.5em] grid w-[1.5em] grid-cols-1 grid-rows-8 items-center justify-items-center">
              <div
                className={cn(
                  "size-[1em] rounded-full border-2 border-white bg-black",
                  turn === "white" && "border-black bg-white",
                )}
              ></div>
            </div>
          )}

          {/* Letter Notations */}
          <LetterNotations />
        </div>
      </div>
    </div>
  );
};

export default BoardArea;
