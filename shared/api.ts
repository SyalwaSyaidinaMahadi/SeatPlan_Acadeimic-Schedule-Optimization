/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Schedule API types
 */
export interface ScheduleSlot {
  id: string;
  date: string;
  start: string;
  end: string;
  course: string;
  room: string;
  lecturer: string;
  conflict: boolean;
}

export interface ScheduleResponse {
  semester: string;
  slots: ScheduleSlot[];
  stats: {
    totalSlots: number;
    conflicts: number;
    rooms: number;
    lecturers: number;
  };
}

export interface UploadResponse {
  success: boolean;
  message: string;
  conflicts: number;
  totalSlots: number;
}

export interface OptimizationRequest {
  semester: string;
  priority: "time" | "room" | "lecturer" | "balanced";
  maxIterations: number;
}

export interface OptimizationResponse {
  status: "running" | "completed" | "error";
  progress: number;
  conflictsBefore: number;
  conflictsAfter: number;
  duration: string;
}
