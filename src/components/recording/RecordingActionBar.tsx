import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Plus, Video, Clock, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface RecordingActionBarProps {
  onScheduleNew?: () => void;
  onStartRecording?: () => void;
  onSettings?: () => void;
}

const RecordingActionBar = ({
  onScheduleNew = () => {},
  onStartRecording = () => {},
  onSettings = () => {},
}: RecordingActionBarProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-medium text-gray-800">Recording Actions</h2>
      </div>

      <div className="flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-gray-200"
                onClick={onSettings}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure recording settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-gray-200"
                onClick={onScheduleNew}
              >
                <Clock className="h-4 w-4" />
                <span>Schedule</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Schedule a new recording</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/live">
                <Button
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
                  size="sm"
                  onClick={onStartRecording}
                >
                  <Video className="h-4 w-4" />
                  <span>Start Recording</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start a new recording immediately</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default RecordingActionBar;
