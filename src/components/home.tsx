import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import DashboardTabs from "./dashboard/DashboardTabs";
import RecordingActionBar from "./recording/RecordingActionBar";
import ScheduleRecordingModal from "./modals/ScheduleRecordingModal";
import RecordingDetailsModal from "./modals/RecordingDetailsModal";
import RecordingSettings from "./recording/RecordingSettings";
import { Recording, User } from "../types";
import {
  fetchUpcomingRecordings,
  fetchPastRecordings,
  fetchRecordingById,
  fetchParticipants,
  createScheduledRecording,
  getCurrentUser,
  deleteRecording,
} from "../lib/api";

const Home = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingRecordings, setUpcomingRecordings] = useState<Recording[]>([]);
  const [pastRecordings, setPastRecordings] = useState<Recording[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleScheduleNew = () => {
    setIsScheduleModalOpen(true);
  };

  const handleStartRecording = () => {
    // This would typically integrate with the Google Meet API
    console.log("Starting immediate recording...");
  };

  const handleSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [upcoming, past, user] = await Promise.all([
          fetchUpcomingRecordings(),
          fetchPastRecordings(),
          getCurrentUser(),
        ]);

        setUpcomingRecordings(upcoming);
        setPastRecordings(past);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

  const handleViewRecordingDetails = async (recordingId: string) => {
    try {
      const recording = await fetchRecordingById(recordingId);
      if (recording) {
        // Fetch participants for this recording
        const participants = await fetchParticipants(recordingId);
        // Add participants to the recording object
        const recordingWithParticipants = {
          ...recording,
          participants: participants,
        };
        setSelectedRecording(recordingWithParticipants as any);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error viewing recording details:", error);
    }
  };

  const handleDeleteRecording = async (recordingId: string) => {
    try {
      const success = await deleteRecording(recordingId);
      if (success) {
        // Remove the deleted recording from state
        setUpcomingRecordings((prev) =>
          prev.filter((recording) => recording.id !== recordingId),
        );
      }
    } catch (error) {
      console.error("Error deleting recording:", error);
    }
  };

  const handleSaveSettings = (data: any) => {
    console.log("Saving settings:", data);
    // In a real app, this would save the settings to the backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={currentUser} />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
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
            <DashboardTabs
              defaultTab={activeTab}
              onTabChange={handleTabChange}
              upcomingRecordings={upcomingRecordings}
              pastRecordings={pastRecordings}
              onViewDetails={handleViewRecordingDetails}
              onDeleteRecording={handleDeleteRecording}
            />
          )}
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <ScheduleRecordingModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        onSubmit={handleScheduleSubmit}
      />

      {selectedRecording && (
        <RecordingDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          recording={selectedRecording}
        />
      )}

      <RecordingSettings
        open={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default Home;
