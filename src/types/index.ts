export interface Recording {
  id: string;
  title: string;
  meetLink: string;
  date: string;
  time: string;
  duration: string;
  quality: string;
  storage: string;
  status?: "processed" | "processing";
  participants?: number;
  videoUrl?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  joinTime: string;
  leaveTime: string;
  duration: string;
  status?: "present" | "late" | "left-early";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
