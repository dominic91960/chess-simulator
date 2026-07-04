import { useState } from "react";

import { FiTrash } from "react-icons/fi";
import { TbTransferVertical } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";

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
          className="transition-default flex w-full items-center justify-between bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={() => setPosition({})}
        >
          Clear Board <FiTrash className="text-[1.1em]" />
        </button>

        <button
          type="button"
          className="transition-default flex w-full items-center justify-between bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={() =>
            setOrientation((current) =>
              current === "white" ? "black" : "white",
            )
          }
        >
          Flip Board <TbTransferVertical className="text-[1.2em]" />
        </button>

        <button
          disabled={isExporting}
          className="transition-default flex w-full items-center justify-between bg-white/10 px-[1em] py-[0.5em] text-white hover:bg-white/20"
          onClick={exportPng}
          type="button"
        >
          {isExporting ? "Rendering…" : "Export JPEG"}{" "}
          <FiDownload className="text-[1.1em]" />
        </button>
      </div>
    </aside>
  );
};

export default ButtonArea;
