import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  UploadIcon,
  FileSpreadsheetIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [semester, setSemester] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !semester) return;

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadStatus("success");
    }, 2000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSemester("");
    setUploadStatus("idle");
  };

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
                <h1 className="text-2xl font-bold text-gray-900">
                  Upload Excel
                </h1>
                <p className="text-gray-600">Upload file jadwal semester</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Tim Akademik
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UploadIcon className="h-5 w-5 mr-2 text-blue-600" />
                Upload File Excel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {uploadStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Berhasil!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    File jadwal semester {semester} telah berhasil diupload dan
                    sedang diproses.
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="w-full"
                    >
                      Upload File Lain
                    </Button>
                    <Link to="/calendar">
                      <Button className="w-full">Lihat Kalender</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={semester} onValueChange={setSemester}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Pilih semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024/1">2024/1 (Ganjil)</SelectItem>
                        <SelectItem value="2024/2">2024/2 (Genap)</SelectItem>
                        <SelectItem value="2025/1">2025/1 (Ganjil)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="file">File Excel</Label>
                    <div className="mt-1">
                      <Input
                        id="file"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {selectedFile && (
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <FileSpreadsheetIcon className="h-4 w-4 mr-1" />
                        {selectedFile.name} (
                        {Math.round(selectedFile.size / 1024)} KB)
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || !semester || uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent" />
                        Mengupload...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Upload File
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Panduan Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 flex items-center">
                  <AlertCircleIcon className="h-4 w-4 mr-2" />
                  Format File Excel
                </h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• File harus berformat .xlsx atau .xls</li>
                  <li>• Maksimal ukuran file 10MB</li>
                  <li>• Sheet pertama akan diproses</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">
                  Kolom yang Diperlukan
                </h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Mata Kuliah</li>
                  <li>• Dosen</li>
                  <li>• Ruang</li>
                  <li>• Hari</li>
                  <li>• Jam Mulai</li>
                  <li>• Jam Selesai</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-900">Proses Optimasi</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Setelah upload, sistem akan otomatis menganalisis dan
                  mengoptimasi jadwal untuk menghindari konflik ruang dan waktu.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Tips</h4>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• Pastikan data lengkap dan akurat</li>
                  <li>• Periksa ejaan nama dosen dan ruang</li>
                  <li>• Format waktu: HH:MM (24 jam)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Uploads */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  semester: "2024/1",
                  file: "jadwal_semester_1_2024.xlsx",
                  date: "2024-01-15",
                  status: "success",
                  conflicts: 3,
                },
                {
                  semester: "2023/2",
                  file: "jadwal_semester_2_2023.xlsx",
                  date: "2024-01-10",
                  status: "success",
                  conflicts: 0,
                },
                {
                  semester: "2023/1",
                  file: "jadwal_semester_1_2023.xlsx",
                  date: "2023-12-20",
                  status: "success",
                  conflicts: 1,
                },
              ].map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <FileSpreadsheetIcon className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{upload.file}</p>
                      <p className="text-sm text-gray-600">
                        Semester {upload.semester} • {upload.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Berhasil
                    </Badge>
                    {upload.conflicts > 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        {upload.conflicts} konflik terdeteksi
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
