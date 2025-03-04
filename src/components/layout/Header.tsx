import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bell,
  Calendar,
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  Video,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useAuth } from "../../context/AuthContext";

import { User } from "../../types";

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header = ({ user: propUser, onLogout: propOnLogout }: HeaderProps) => {
  const { user: contextUser, logout } = useAuth();
  const navigate = useNavigate();

  // Use the user from context if available, otherwise use the prop
  const user = contextUser || propUser;

  const handleLogout = () => {
    if (propOnLogout) {
      propOnLogout();
    } else {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 w-full h-[72px] px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center">
        <div className="md:hidden">
          <MobileNav />
        </div>

        <Link to="/" className="flex items-center gap-2">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-900">MeetRecorder</span>
        </Link>

        <nav className="ml-10 hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/recordings"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm"
          >
            Recordings
          </Link>
          <Link
            to="/schedule"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm"
          >
            Schedule
          </Link>
          <Link
            to="/reports"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm"
          >
            Reports
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <Calendar className="h-5 w-5 text-gray-600" />
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">
                {user?.name || "User"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
