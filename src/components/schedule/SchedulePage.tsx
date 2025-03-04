import React, { useState } from "react";
import Header from "../layout/Header";
import RecordingActionBar from "../recording/RecordingActionBar";
import ScheduleRecordingModal from "../modals/ScheduleRecordingModal";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "../ui/button";
import {
  fetchUpcomingRecordings,
  createScheduledRecording,
} from "../../lib/api";
import { useEffect } from "react";
import { Recording } from "../../types";

const SchedulePage = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [upcomingRecordings, setUpcomingRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecordings = async () => {
      setIsLoading(true);
      try {
        const recordings = await fetchUpcomingRecordings();
        setUpcomingRecordings(recordings);
      } catch (error) {
        console.error("Error loading upcoming recordings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecordings();
  }, []);

  const handleScheduleNew = () => {
    setIsScheduleModalOpen(true);
  };

  const handleStartRecording = () => {
    console.log("Starting immediate recording...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  const handleScheduleSubmit = async (data: any) => {
    try {
      const newRecording = await createScheduledRecording(data);
      if (newRecording) {
        setUpcomingRecordings((prev) => [...prev, newRecording]);
      }
    } catch (error) {
      console.error("Error scheduling recording:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Schedule Recordings</h1>

          <RecordingActionBar
            onScheduleNew={handleScheduleNew}
            onStartRecording={handleStartRecording}
            onSettings={handleSettings}
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Scheduled Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingRecordings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <Video className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-lg">
                        No upcoming recordings scheduled
                      </p>
                      <Button
                        onClick={handleScheduleNew}
                        variant="outline"
                        className="mt-4"
                      >
                        Schedule Your First Recording
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingRecordings.map((recording) => (
                        <Card
                          key={recording.id}
                          className="overflow-hidden border border-gray-200"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {recording.title}
                            </CardTitle>
                            <p className="text-sm text-gray-500 truncate">
                              {recording.meetLink}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(recording.date)}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>
                                  {recording.time} ({recording.duration})
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <ScheduleRecordingModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
};

export default SchedulePage;
