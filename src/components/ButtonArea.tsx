import { useState } from "react";

import { toJpeg } from "html-to-image";
import type { PositionDataType } from "react-chessboard";

interface ButtonAreaProps {
  snapshotRef: React.RefObject<HTMLDivElement | null>;
  setOrientation: React.Dispatch<React.SetStateAction<"white" | "black">>;
  setPosition: React.Dispatch<React.SetStateAction<PositionDataType>>;
}

const ButtonArea: React.FC<ButtonAreaProps> = ({
  snapshotRef,
  setOrientation,
  setPosition,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportPng = async () => {
    const node = snapshotRef.current;
    if (!node || isExporting) return;

    setIsExporting(true);

    try {
      await document.fonts.ready;

      const dataUrl = await toJpeg(node, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#262626 ",
      });

      const link = document.createElement("a");
      link.download = `chess-position-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <aside className="sticky top-3 sm:top-3 md:top-4 lg:top-4 lg:h-fit xl:top-5 2xl:top-6">
      <div className="flex flex-col gap-2 bg-neutral-800 p-2">
        <button
          type="button"
          className="transition-default w-full bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={() => setPosition({})}
        >
          Clear
        </button>

        <button
          type="button"
          className="transition-default w-full bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={() =>
            setOrientation((current) =>
              current === "white" ? "black" : "white",
            )
          }
        >
          Flip
        </button>

        <button
          disabled={isExporting}
          className="transition-default w-full bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={exportPng}
          type="button"
        >
          {isExporting ? "Rendering…" : "Export PNG"}
        </button>
      </div>
    </aside>
  );
};

export default ButtonArea;
