import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Pause,
  Play,
  StopCircle,
  Clock,
} from "lucide-react";

interface RecordingControlsProps {
  isRecording?: boolean;
  isPaused?: boolean;
  duration?: number; // in seconds
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onPauseRecording?: () => void;
  onResumeRecording?: () => void;
  onToggleMic?: (enabled: boolean) => void;
  onToggleVideo?: (enabled: boolean) => void;
}

const RecordingControls = ({
  isRecording = false,
  isPaused = false,
  duration = 0,
  onStartRecording = () => {},
  onStopRecording = () => {},
  onPauseRecording = () => {},
  onResumeRecording = () => {},
  onToggleMic = () => {},
  onToggleVideo = () => {},
}: RecordingControlsProps) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  const handleToggleMic = () => {
    const newState = !micEnabled;
    setMicEnabled(newState);
    onToggleMic(newState);
  };

  const handleToggleVideo = () => {
    const newState = !videoEnabled;
    setVideoEnabled(newState);
    onToggleVideo(newState);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {isPaused ? "Recording Paused" : "Recording"}
            </span>
          </div>
        )}
        {isRecording && (
          <div className="flex items-center gap-1 ml-4">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">
              {formatDuration(duration)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleMic}
                className={!micEnabled ? "bg-gray-100" : ""}
              >
                {micEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4 text-red-500" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{micEnabled ? "Mute Microphone" : "Unmute Microphone"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleVideo}
                className={!videoEnabled ? "bg-gray-100" : ""}
              >
                {videoEnabled ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4 text-red-500" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{videoEnabled ? "Disable Camera" : "Enable Camera"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isRecording ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPaused ? onResumeRecording : onPauseRecording}
                    className="flex items-center gap-1"
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4" />
                        <span>Pause</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPaused ? "Resume Recording" : "Pause Recording"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onStopRecording}
                    className="flex items-center gap-1"
                  >
                    <StopCircle className="h-4 w-4" />
                    <span>Stop</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stop Recording</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
                  size="sm"
                  onClick={onStartRecording}
                >
                  <Video className="h-4 w-4" />
                  <span>Start Recording</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start a new recording</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;
