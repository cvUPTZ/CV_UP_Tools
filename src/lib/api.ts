import { supabase } from "./supabase";
import { Recording, Participant, User } from "../types";

// Fetch upcoming recordings
export const fetchUpcomingRecordings = async (): Promise<Recording[]> => {
  try {
    // This would be a real API call to your backend or Supabase
    // For now, we'll return mock data that looks like it came from an API
    return [
      {
        id: "rec_001",
        title: "Weekly Team Standup",
        meetLink: "https://meet.google.com/abc-defg-hij",
        date: "2023-06-15",
        time: "10:00 AM",
        duration: "60 min",
        quality: "HD",
        storage: "Google Drive",
      },
      {
        id: "rec_002",
        title: "Product Planning Session",
        meetLink: "https://meet.google.com/klm-nopq-rst",
        date: "2023-06-16",
        time: "2:00 PM",
        duration: "45 min",
        quality: "HD",
        storage: "Local Storage",
      },
      {
        id: "rec_003",
        title: "Engineering Standup",
        meetLink: "https://meet.google.com/uvw-xyz-123",
        date: "2023-06-17",
        time: "9:30 AM",
        duration: "30 min",
        quality: "SD",
        storage: "Google Drive",
      },
    ];
  } catch (error) {
    console.error("Error fetching upcoming recordings:", error);
    return [];
  }
};

// Fetch past recordings
export const fetchPastRecordings = async (): Promise<Recording[]> => {
  try {
    // This would be a real API call to your backend or Supabase
    return [
      {
        id: "rec_101",
        title: "Weekly Team Standup",
        date: "2023-06-10",
        time: "10:00 AM",
        duration: "45m",
        participants: 12,
        status: "processed",
        meetLink: "https://meet.google.com/abc-defg-hij",
        videoUrl: "https://example.com/recordings/rec_101.mp4",
      },
      {
        id: "rec_102",
        title: "Product Planning Session",
        date: "2023-06-08",
        time: "2:00 PM",
        duration: "1h 30m",
        participants: 8,
        status: "processed",
        meetLink: "https://meet.google.com/klm-nopq-rst",
        videoUrl: "https://example.com/recordings/rec_102.mp4",
      },
      {
        id: "rec_103",
        title: "Client Presentation",
        date: "2023-06-05",
        time: "11:00 AM",
        duration: "55m",
        participants: 15,
        status: "processed",
        meetLink: "https://meet.google.com/uvw-xyz-123",
        videoUrl: "https://example.com/recordings/rec_103.mp4",
      },
      {
        id: "rec_104",
        title: "Engineering Sync",
        date: "2023-06-03",
        time: "9:30 AM",
        duration: "1h 15m",
        participants: 10,
        status: "processed",
        meetLink: "https://meet.google.com/456-789-abc",
        videoUrl: "https://example.com/recordings/rec_104.mp4",
      },
      {
        id: "rec_105",
        title: "Design Review",
        date: "2023-06-01",
        time: "3:00 PM",
        duration: "50m",
        participants: 6,
        status: "processing",
        meetLink: "https://meet.google.com/def-ghi-jkl",
      },
    ];
  } catch (error) {
    console.error("Error fetching past recordings:", error);
    return [];
  }
};

// Fetch recording details by ID
export const fetchRecordingById = async (
  id: string,
): Promise<Recording | null> => {
  try {
    // This would be a real API call to your backend or Supabase
    const recordings = await fetchPastRecordings();
    return recordings.find((recording) => recording.id === id) || null;
  } catch (error) {
    console.error(`Error fetching recording ${id}:`, error);
    return null;
  }
};

// Fetch participants for a recording
export const fetchParticipants = async (
  recordingId: string,
): Promise<Participant[]> => {
  try {
    // This would be a real API call to your backend or Supabase
    return [
      {
        id: "p_001",
        name: "John Doe",
        email: "john.doe@example.com",
        joinTime: "10:00 AM",
        leaveTime: "11:00 AM",
        duration: "60 min",
        status: "present",
      },
      {
        id: "p_002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        joinTime: "10:05 AM",
        leaveTime: "11:00 AM",
        duration: "55 min",
        status: "late",
      },
      {
        id: "p_003",
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        joinTime: "10:00 AM",
        leaveTime: "10:45 AM",
        duration: "45 min",
        status: "left-early",
      },
      {
        id: "p_004",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        joinTime: "10:00 AM",
        leaveTime: "11:00 AM",
        duration: "60 min",
        status: "present",
      },
      {
        id: "p_005",
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
        joinTime: "10:10 AM",
        leaveTime: "10:50 AM",
        duration: "40 min",
        status: "late",
      },
    ];
  } catch (error) {
    console.error(
      `Error fetching participants for recording ${recordingId}:`,
      error,
    );
    return [];
  }
};

// Create a new scheduled recording
export const createScheduledRecording = async (
  recordingData: Partial<Recording>,
): Promise<Recording | null> => {
  try {
    // This would be a real API call to your backend or Supabase
    // For now, we'll just return a mock response with the data and a generated ID
    const newRecording: Recording = {
      id: `rec_${Math.floor(Math.random() * 1000)}`,
      title: recordingData.title || "Untitled Recording",
      meetLink: recordingData.meetLink || "",
      date: recordingData.date || new Date().toISOString().split("T")[0],
      time: recordingData.time || "12:00 PM",
      duration: recordingData.duration || "60 min",
      quality: recordingData.quality || "HD",
      storage: recordingData.storage || "Google Drive",
    };

    console.log("Created new scheduled recording:", newRecording);
    return newRecording;
  } catch (error) {
    console.error("Error creating scheduled recording:", error);
    return null;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // This would be a real API call to your backend or Supabase
    return {
      id: "user_001",
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// Delete a scheduled recording
export const deleteRecording = async (id: string): Promise<boolean> => {
  try {
    // This would be a real API call to your backend or Supabase
    console.log(`Deleted recording with ID: ${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting recording ${id}:`, error);
    return false;
  }
};

// Export attendance data as CSV (mock function)
export const exportAttendanceAsCSV = (recordingId: string): void => {
  console.log(`Exporting attendance for recording ${recordingId} as CSV`);
  // In a real implementation, this would generate and download a CSV file
};

// Export attendance data as PDF (mock function)
export const exportAttendanceAsPDF = (recordingId: string): void => {
  console.log(`Exporting attendance for recording ${recordingId} as PDF`);
  // In a real implementation, this would generate and download a PDF file
};
