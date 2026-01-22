import { Moon, Sun, User } from "lucide-react";
import { IconButton } from "./Buttons/IconButton";
import type { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setThemePair, toggleTheme } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";

type Props = {};

function Navbar({}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { pair, mode } = useSelector((state: RootState) => state.theme);
  return (
    <header className="bg-primary-foreground text-foreground w-screen flex items-center justify-between px-6 py-4 shadow-md border-b-2 border-primary">
      <h1 className="text-xl font-semibold">Basic ERP</h1>
      <div className="flex space-x-4">
        <IconButton
          icon={mode == "light" ? Moon : Sun}
          onClick={() => dispatch(toggleTheme())}
        />
        <select name="pair-select" id="pair-sel">
          <option onClick={()=>dispatch(setThemePair('corporate'))} value="corporate">Corporate</option>
          <option onClick={()=>dispatch(setThemePair('purple'))} value="purple">Purple</option>
          <option onClick={()=>dispatch(setThemePair('green'))} value="green">Green</option>
          <option onClick={()=>dispatch(setThemePair('blue'))} value="blue">Blue</option>
        </select>
        <button className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile
        </button>
      </div>
    </header>
  );
}

export default Navbar;
