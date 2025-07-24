import { RequestHandler } from "express";

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

// Mock data for demonstration
const mockScheduleData: ScheduleSlot[] = [
  {
    id: "1",
    date: "2024-01-15",
    start: "08:00",
    end: "09:40",
    course: "Algoritma & Pemrograman",
    lecturer: "Dr. Budi Santoso",
    room: "Lab 1",
    conflict: false
  },
  {
    id: "2",
    date: "2024-01-15",
    start: "10:00",
    end: "11:40",
    course: "Basis Data",
    lecturer: "Prof. Siti Aminah",
    room: "R201",
    conflict: true
  },
  {
    id: "3",
    date: "2024-01-16",
    start: "08:00",
    end: "09:40",
    course: "Struktur Data",
    lecturer: "Prof. Eko Prasetyo",
    room: "Lab 1",
    conflict: true
  }
];

export const getSchedule: RequestHandler = (req, res) => {
  const { semester } = req.params;
  
  const response: ScheduleResponse = {
    semester,
    slots: mockScheduleData,
    stats: {
      totalSlots: mockScheduleData.length,
      conflicts: mockScheduleData.filter(slot => slot.conflict).length,
      rooms: new Set(mockScheduleData.map(slot => slot.room)).size,
      lecturers: new Set(mockScheduleData.map(slot => slot.lecturer)).size
    }
  };
  
  res.json(response);
};

export const uploadSchedule: RequestHandler = (req, res) => {
  // In a real application, this would process the uploaded Excel file
  // For now, we'll simulate a successful upload
  
  setTimeout(() => {
    res.json({
      success: true,
      message: "File berhasil diupload dan diproses",
      conflicts: 3,
      totalSlots: 234
    });
  }, 1000);
};

export const optimizeSchedule: RequestHandler = (req, res) => {
  const { semester, priority, maxIterations }: OptimizationRequest = req.body;
  
  // Simulate optimization process
  const response: OptimizationResponse = {
    status: "completed",
    progress: 100,
    conflictsBefore: 8,
    conflictsAfter: 3,
    duration: "2.3s"
  };
  
  res.json(response);
};

export const getOptimizationStatus: RequestHandler = (req, res) => {
  // Simulate optimization status check
  res.json({
    status: "completed",
    progress: 100,
    conflictsBefore: 8,
    conflictsAfter: 3,
    duration: "2.3s"
  });
};
