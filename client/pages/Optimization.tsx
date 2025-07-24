import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ArrowLeftIcon, PlayIcon, PauseIcon, RefreshCwIcon, DownloadIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Optimization() {
  const [selectedSemester, setSelectedSemester] = useState("2024/1");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [optimizationStatus, setOptimizationStatus] = useState<"idle" | "running" | "completed" | "error">("completed");

  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setOptimizationStatus("running");
    setOptimizationProgress(0);

    // Simulate optimization progress
    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setOptimizationStatus("completed");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const conflicts = [
    { 
      id: 1, 
      type: "Ruang", 
      description: "Lab 1 digunakan bersamaan", 
      courses: ["Algoritma & Pemrograman", "Struktur Data"], 
      time: "Senin, 08:00-09:40",
      severity: "high"
    },
    { 
      id: 2, 
      type: "Dosen", 
      description: "Prof. Siti Aminah mengajar 2 mata kuliah bersamaan", 
      courses: ["Basis Data", "Sistem Basis Data"], 
      time: "Selasa, 10:00-11:40",
      severity: "high"
    },
    { 
      id: 3, 
      type: "Ruang", 
      description: "R201 konflik jadwal", 
      courses: ["Pemrograman Web"], 
      time: "Rabu, 13:00-14:40",
      severity: "medium"
    }
  ];

  const optimizationHistory = [
    { date: "2024-01-15 14:30", duration: "2.3s", conflicts_before: 8, conflicts_after: 3, status: "success" },
    { date: "2024-01-15 10:15", duration: "1.8s", conflicts_before: 5, conflicts_after: 2, status: "success" },
    { date: "2024-01-14 16:45", duration: "3.1s", conflicts_before: 12, conflicts_after: 5, status: "success" },
    { date: "2024-01-14 09:20", duration: "2.7s", conflicts_before: 6, conflicts_after: 1, status: "success" }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Optimasi Jadwal</h1>
                <p className="text-gray-600">Kelola dan optimasi konflik jadwal</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Tim Akademik
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Optimization Control */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Kontrol Optimasi</span>
                  <div className="flex items-center space-x-2">
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
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Optimization Status */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Status Optimasi</h4>
                      <p className="text-sm text-gray-600">
                        {optimizationStatus === "running" && "Sedang mengoptimasi jadwal..."}
                        {optimizationStatus === "completed" && "Optimasi selesai"}
                        {optimizationStatus === "idle" && "Siap untuk optimasi"}
                        {optimizationStatus === "error" && "Terjadi error dalam optimasi"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {optimizationStatus === "running" && (
                        <div className="flex items-center text-blue-600">
                          <div className="animate-spin h-5 w-5 mr-2 rounded-full border-2 border-blue-600 border-t-transparent" />
                          Berjalan
                        </div>
                      )}
                      {optimizationStatus === "completed" && (
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Selesai
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {optimizationStatus === "running" && (
                    <div className="space-y-2">
                      <Progress value={optimizationProgress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">{optimizationProgress}%</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleStartOptimization}
                    disabled={isOptimizing}
                    className="flex items-center"
                  >
                    {isOptimizing ? (
                      <PauseIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <PlayIcon className="h-4 w-4 mr-2" />
                    )}
                    {isOptimizing ? "Menjalankan..." : "Mulai Optimasi"}
                  </Button>
                  
                  <Button variant="outline">
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  
                  <Button variant="outline">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Export Hasil
                  </Button>

                  <Link to="/calendar">
                    <Button variant="outline">
                      Lihat Kalender
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Conflicts List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
                  Konflik Terdeteksi ({conflicts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conflicts.map((conflict) => (
                    <div key={conflict.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Badge variant={conflict.severity === "high" ? "destructive" : "secondary"}>
                              {conflict.type}
                            </Badge>
                            <span className="ml-2 text-sm text-gray-600">{conflict.time}</span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{conflict.description}</h4>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Mata Kuliah:</span> {conflict.courses.join(", ")}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Perbaiki
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {conflicts.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">Tidak Ada Konflik</h3>
                      <p className="text-gray-600">Semua jadwal telah dioptimasi dengan baik</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Optimasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Konflik Awal:</span>
                  <span className="font-bold text-red-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Konflik Tersisa:</span>
                  <span className="font-bold text-amber-600">{conflicts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tingkat Optimasi:</span>
                  <span className="font-bold text-green-600">62.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waktu Proses:</span>
                  <span className="font-bold text-blue-600">2.3s</span>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Prioritas Optimasi</label>
                  <Select defaultValue="balanced">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Waktu</SelectItem>
                      <SelectItem value="room">Ruang</SelectItem>
                      <SelectItem value="lecturer">Dosen</SelectItem>
                      <SelectItem value="balanced">Seimbang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Max Iterasi</label>
                  <Select defaultValue="1000">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500</SelectItem>
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem value="2000">2000</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recent Optimizations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Riwayat Optimasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {optimizationHistory.map((history, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-gray-900">{history.date}</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Berhasil
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>Durasi: {history.duration}</div>
                        <div>Konflik: {history.conflicts_before} → {history.conflicts_after}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
