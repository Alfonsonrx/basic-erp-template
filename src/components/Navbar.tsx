import { Link } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import { IconButton } from "./IconButton";
import type { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";

type Props = {};

function Navbar({}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { mode } = useSelector((state: RootState) => state.theme);
  return (
    <header className="bg-foreground w-screen flex items-center justify-between text-primary-foreground p-4 shadow-md">
      <h1 className="text-xl font-semibold">Basic ERP</h1>
      <div className="flex">
        <IconButton
          icon={mode == "light" ? Moon : Sun}
          className="text-primary-foreground"
          onClick={() => dispatch(toggleTheme())}
        />
        <Link to="/profile">
          <button className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
