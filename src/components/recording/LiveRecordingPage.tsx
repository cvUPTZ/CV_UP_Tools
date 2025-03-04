import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import RecordingControls from "./RecordingControls";
import PresenterTools from "../presenter/PresenterTools";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, Users, Video, Download, PresentationIcon } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinTime: string;
  status: "active" | "inactive";
}

const LiveRecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showPresenterTools, setShowPresenterTools] = useState(false);
  const [isPresenterToolsExpanded, setIsPresenterToolsExpanded] =
    useState(true);
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "p1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      joinTime: "10:00 AM",
      status: "active",
    },
    {
      id: "p2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      joinTime: "10:02 AM",
      status: "active",
    },
    {
      id: "p3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      joinTime: "10:05 AM",
      status: "active",
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setDuration(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    // In a real app, this would save the recording
    console.log("Recording stopped after", duration, "seconds");
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
  };

  const handleResumeRecording = () => {
    setIsPaused(false);
  };

  const handleToggleMic = (enabled: boolean) => {
    console.log("Microphone", enabled ? "enabled" : "disabled");
  };

  const handleToggleVideo = (enabled: boolean) => {
    console.log("Video", enabled ? "enabled" : "disabled");
  };

  const togglePresenterTools = () => {
    setShowPresenterTools(!showPresenterTools);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Live Recording</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={togglePresenterTools}
              >
                <PresentationIcon className="h-4 w-4" />
                {showPresenterTools
                  ? "Hide Presenter Tools"
                  : "Show Presenter Tools"}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-1"
                disabled={!isRecording}
              >
                <Download className="h-4 w-4" />
                Save Recording
              </Button>
            </div>
          </div>

          <RecordingControls
            isRecording={isRecording}
            isPaused={isPaused}
            duration={duration}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onPauseRecording={handlePauseRecording}
            onResumeRecording={handleResumeRecording}
            onToggleMic={handleToggleMic}
            onToggleVideo={handleToggleVideo}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Meeting Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center">
                    {isRecording ? (
                      <div className="relative w-full h-full">
                        <img
                          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80"
                          alt="Meeting preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="destructive"
                            className="animate-pulse"
                          >
                            {isPaused ? "PAUSED" : "REC"}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-white flex flex-col items-center">
                        <Video className="h-16 w-16 mb-2 opacity-50" />
                        <p>Click "Start Recording" to begin</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Meeting started at 10:00 AM
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {participants.length} participants
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={participant.avatarUrl}
                              alt={participant.name}
                            />
                            <AvatarFallback>
                              {participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {participant.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Joined at {participant.joinTime}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            participant.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {participant.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {showPresenterTools && (
        <PresenterTools
          isExpanded={isPresenterToolsExpanded}
          onToggleExpand={() =>
            setIsPresenterToolsExpanded(!isPresenterToolsExpanded)
          }
          onClose={() => setShowPresenterTools(false)}
        />
      )}
    </div>
  );
};

export default LiveRecordingPage;
