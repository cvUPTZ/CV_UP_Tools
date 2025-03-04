import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";
import { Menu, Video, X } from "lucide-react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">
                MeetRecorder
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4 mt-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/recordings"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Recordings
            </Link>
            <Link
              to="/schedule"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Schedule
            </Link>
            <Link
              to="/reports"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Reports
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
