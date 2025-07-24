import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ArrowLeftIcon, FilterIcon, DownloadIcon, AlertTriangleIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Calendar() {
  const [selectedSemester, setSelectedSemester] = useState("2024/1");
  const [selectedWeek, setSelectedWeek] = useState("1");
  const [selectedView, setSelectedView] = useState("week");

  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  const scheduleData = {
    "Senin": [
      { time: "08:00-09:40", course: "Algoritma & Pemrograman", lecturer: "Dr. Budi Santoso", room: "Lab 1", hasConflict: false },
      { time: "10:00-11:40", course: "Basis Data", lecturer: "Prof. Siti Aminah", room: "R201", hasConflict: true },
      { time: "13:00-14:40", course: "Jaringan Komputer", lecturer: "Dr. Ahmad Fauzi", room: "Lab 2", hasConflict: false }
    ],
    "Selasa": [
      { time: "07:00-08:40", course: "Matematika Diskrit", lecturer: "Dr. Rina Wati", room: "R102", hasConflict: false },
      { time: "09:00-10:40", course: "Pemrograman Web", lecturer: "M.Kom. Dedi Susanto", room: "Lab 3", hasConflict: false },
      { time: "14:00-15:40", course: "Sistem Operasi", lecturer: "Dr. Lisa Permata", room: "R203", hasConflict: false }
    ],
    "Rabu": [
      { time: "08:00-09:40", course: "Struktur Data", lecturer: "Prof. Eko Prasetyo", room: "Lab 1", hasConflict: true },
      { time: "10:00-11:40", course: "Rekayasa Perangkat Lunak", lecturer: "Dr. Maya Sari", room: "R204", hasConflict: false },
      { time: "13:00-14:40", course: "Kecerdasan Buatan", lecturer: "Dr. Rudi Hartono", room: "Lab 4", hasConflict: false }
    ],
    "Kamis": [
      { time: "07:00-08:40", course: "Grafika Komputer", lecturer: "M.Kom. Andi Wijaya", room: "Lab 5", hasConflict: false },
      { time: "09:00-10:40", course: "Keamanan Sistem", lecturer: "Dr. Novi Indah", room: "R205", hasConflict: false },
      { time: "15:00-16:40", course: "Mobile Programming", lecturer: "M.Kom. Fajar Nugroho", room: "Lab 3", hasConflict: false }
    ],
    "Jumat": [
      { time: "08:00-09:40", course: "Data Mining", lecturer: "Prof. Dewi Kartika", room: "R301", hasConflict: false },
      { time: "10:00-11:40", course: "Interaksi Manusia Komputer", lecturer: "Dr. Hendra Kurnia", room: "R302", hasConflict: false }
    ]
  };

  const conflictCount = Object.values(scheduleData).flat().filter(item => item.hasConflict).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <ArrowLeftIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kalender Jadwal</h1>
                <p className="text-gray-600">Tampilan jadwal kuliah semester</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {conflictCount > 0 && (
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  <AlertTriangleIcon className="h-3 w-3 mr-1" />
                  {conflictCount} Konflik
                </Badge>
              )}
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Tim Akademik
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/1">2024/1</SelectItem>
                  <SelectItem value="2024/2">2024/2</SelectItem>
                  <SelectItem value="2023/2">2023/2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Minggu 1</SelectItem>
                  <SelectItem value="2">Minggu 2</SelectItem>
                  <SelectItem value="3">Minggu 3</SelectItem>
                  <SelectItem value="4">Minggu 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link to="/optimization">
              <Button size="sm">
                Optimasi Ulang
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Jadwal Minggu {selectedWeek} - Semester {selectedSemester}</span>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span>Konflik</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 gap-1 min-w-[800px]">
                {/* Header */}
                <div className="p-2 font-medium text-gray-600 text-sm">Jam</div>
                {days.map(day => (
                  <div key={day} className="p-2 font-medium text-gray-900 text-center bg-gray-50">
                    {day}
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map((time, timeIndex) => (
                  <div key={timeIndex} className="contents">
                    <div className="p-2 text-sm text-gray-600 border-r border-gray-200 font-medium">
                      {time}
                    </div>
                    {days.map(day => {
                      const daySchedule = scheduleData[day] || [];
                      const currentSlot = daySchedule.find(slot => {
                        const startTime = slot.time.split('-')[0];
                        return startTime === time;
                      });

                      return (
                        <div key={`${day}-${time}`} className="border border-gray-200 min-h-[60px] p-1">
                          {currentSlot && (
                            <div className={`p-2 rounded text-xs ${
                              currentSlot.hasConflict 
                                ? 'bg-red-100 border-red-300 border' 
                                : 'bg-green-100 border-green-300 border'
                            }`}>
                              <div className="font-medium text-gray-900 mb-1">
                                {currentSlot.course}
                              </div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {currentSlot.time}
                              </div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <UserIcon className="h-3 w-3 mr-1" />
                                {currentSlot.lecturer}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPinIcon className="h-3 w-3 mr-1" />
                                {currentSlot.room}
                              </div>
                              {currentSlot.hasConflict && (
                                <div className="flex items-center text-red-600 mt-1">
                                  <AlertTriangleIcon className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Konflik Ruang</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Jadwal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Mata Kuliah:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jam Kuliah/Minggu:</span>
                  <span className="font-medium">32 jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ruang Digunakan:</span>
                  <span className="font-medium">8 ruang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Konflik Terdeteksi:</span>
                  <span className="font-medium text-red-600">{conflictCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ruang Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lab 1:</span>
                  <span className="font-medium">12 jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R201:</span>
                  <span className="font-medium">10 jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lab 3:</span>
                  <span className="font-medium">8 jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">R204:</span>
                  <span className="font-medium">6 jam</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Waktu Optimal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pagi (07-11):</span>
                  <span className="font-medium text-green-600">Rendah konflik</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Siang (11-15):</span>
                  <span className="font-medium text-amber-600">Sedang konflik</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sore (15-18):</span>
                  <span className="font-medium text-green-600">Rendah konflik</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
