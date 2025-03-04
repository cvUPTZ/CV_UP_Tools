import React from "react";
import Header from "../layout/Header";
import PastRecordings from "../dashboard/PastRecordings";
import { fetchPastRecordings, fetchRecordingById } from "../../lib/api";
import { useState, useEffect } from "react";
import { Recording } from "../../types";
import RecordingDetailsModal from "../modals/RecordingDetailsModal";

const RecordingsPage = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const loadRecordings = async () => {
      setIsLoading(true);
      try {
        const pastRecordings = await fetchPastRecordings();
        setRecordings(pastRecordings);
      } catch (error) {
        console.error("Error loading recordings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecordings();
  }, []);

  const handleViewRecordingDetails = async (recordingId: string) => {
    try {
      const recording = await fetchRecordingById(recordingId);
      if (recording) {
        setSelectedRecording(recording);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error viewing recording details:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Recordings</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <PastRecordings
              recordings={recordings}
              onViewDetails={handleViewRecordingDetails}
            />
          )}
        </div>
      </main>

      {selectedRecording && (
        <RecordingDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          recording={selectedRecording}
        />
      )}
    </div>
  );
};

export default RecordingsPage;
