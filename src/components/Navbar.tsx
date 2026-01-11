import { Link } from "react-router-dom";
import { User} from "lucide-react";

type Props = {};

function Navbar({}: Props) {
  return (
    <header className="bg-white w-screen flex items-center justify-between bg-primary text-primary-foreground p-4 shadow-md">
      <h1 className="text-xl font-semibold">Basic ERP</h1>
      <Link to="/profile">
        <button className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile
        </button>
      </Link>
    </header>
  );
}

export default Navbar;
