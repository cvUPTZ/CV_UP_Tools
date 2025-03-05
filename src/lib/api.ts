import { supabase } from "./supabase";
import { Recording, Participant, User } from "../types";

// Fetch upcoming recordings
export const fetchUpcomingRecordings = async (): Promise<Recording[]> => {
  try {
    const { data, error } = await supabase
      .from("recordings")
      .select("*")
      .eq("status", "upcoming");

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching upcoming recordings:", error);
    return [];
  }
};

// Fetch past recordings
export const fetchPastRecordings = async (): Promise<Recording[]> => {
  try {
    const { data, error } = await supabase
      .from("recordings")
      .select("*")
      .eq("status", "past");

    if (error) {
      throw error;
    }

    return data || [];
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
    const { data, error } = await supabase
      .from("recordings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data || null;
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
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("recording_id", recordingId);

    if (error) {
      throw error;
    }

    return data || [];
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
    const { data, error } = await supabase
      .from("recordings")
      .insert([
        {
          title: recordingData.title || "Untitled Recording",
          meetLink: recordingData.meetLink || "",
          date: recordingData.date || new Date().toISOString().split("T")[0],
          time: recordingData.time || "12:00 PM",
          duration: recordingData.duration || "60 min",
          quality: recordingData.quality || "HD",
          storage: recordingData.storage || "Google Drive",
          status: "upcoming",
        },
      ])
      .select("*");

    if (error) {
      throw error;
    }

    console.log("Created new scheduled recording:", data);
    return data ? data[0] : null;
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
    const { error } = await supabase.from("recordings").delete().eq("id", id);

    if (error) {
      throw error;
    }

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
