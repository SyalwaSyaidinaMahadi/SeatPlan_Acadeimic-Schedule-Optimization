import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UploadIcon, UsersIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const stats = [
    { label: "Total Jadwal", value: "234", icon: CalendarIcon, color: "text-blue-600" },
    { label: "Konflik Terdeteksi", value: "3", icon: AlertTriangleIcon, color: "text-red-600" },
    { label: "Jadwal Optimal", value: "231", icon: CheckCircleIcon, color: "text-green-600" },
    { label: "Ruang Tersedia", value: "45", icon: UsersIcon, color: "text-purple-600" }
  ];

  const recentUploads = [
    { semester: "2024/1", date: "2024-01-15", status: "Dioptimasi", conflicts: 3 },
    { semester: "2023/2", date: "2024-01-10", status: "Selesai", conflicts: 0 },
    { semester: "2023/1", date: "2023-12-20", status: "Selesai", conflicts: 1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Academic Scheduler</h1>
                <p className="text-gray-600">Sistem Penjadwalan Otomatis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <UsersIcon className="h-3 w-3 mr-1" />
                Tim Akademik
              </Badge>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/upload">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center p-6">
                  <UploadIcon className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Upload Excel</h3>
                    <p className="text-sm text-gray-600">Upload file jadwal semester</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/calendar">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center p-6">
                  <CalendarIcon className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Lihat Kalender</h3>
                    <p className="text-sm text-gray-600">Tampilan kalender jadwal</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/optimization">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex items-center p-6">
                  <CheckCircleIcon className="h-8 w-8 text-purple-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Optimasi</h3>
                    <p className="text-sm text-gray-600">Kelola hasil optimasi</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistik Sistem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                Upload Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Semester {upload.semester}</p>
                      <p className="text-sm text-gray-600">{upload.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={upload.status === "Selesai" ? "default" : "secondary"}>
                        {upload.status}
                      </Badge>
                      {upload.conflicts > 0 && (
                        <p className="text-xs text-red-600 mt-1">{upload.conflicts} konflik</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Lihat Semua
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Sistem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Status Optimasi</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Sistem optimasi berjalan normal. Rata-rata waktu proses: 2.3 detik
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Performa Sistem</h4>
                  <p className="text-sm text-green-700 mt-1">
                    99.8% uptime dalam 30 hari terakhir
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-900">Tips</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Gunakan format Excel standar untuk hasil optimasi terbaik
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
