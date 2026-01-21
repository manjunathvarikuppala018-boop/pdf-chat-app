import { NavLink } from "react-router-dom";
import {
  Home,
  Upload,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function Sidebar() {
  const base =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition";

  const inactive =
    "text-gray-700 hover:bg-gray-100";

  const active =
    "bg-blue-50 text-blue-600";

  return (
    <aside className="w-64 border-r bg-white p-4">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">
          P
        </div>
        <span className="font-semibold text-gray-900">PDF Chat</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Home className="h-4 w-4" />
          Home
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Upload className="h-4 w-4" />
          Upload
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <FileText className="h-4 w-4" />
          Documents
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </NavLink>

        
      </nav>
    </aside>
  );
}
