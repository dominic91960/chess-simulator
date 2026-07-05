import type { SetStateAction } from "react";
import { turnValues } from "../lib/constants";

interface ButtonAreaProps {
  turn: "white" | "black" | "none";
  setTurn: React.Dispatch<React.SetStateAction<"white" | "black" | "none">>;
}

const TurnIndicatorSelect: React.FC<ButtonAreaProps> = ({ turn, setTurn }) => {
  return (
    <div className="flex flex-col gap-2 bg-neutral-800 p-2">
      <fieldset>
        <legend>Set turn indicator:</legend>

        <div className="mt-2 flex items-center justify-between lg:flex-col lg:items-stretch lg:justify-normal lg:gap-2">
          {turnValues.map((e) => (
            <div className="flex gap-2">
              <input
                type="radio"
                id={e}
                name="turn"
                value={e}
                checked={turn === e}
                onChange={(e) => {
                  const value = e.target.value as SetStateAction<
                    "white" | "black" | "none"
                  >;
                  setTurn(value);
                }}
              />
              <label htmlFor={e} className="capitalize">
                {e}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default TurnIndicatorSelect;
