import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HomeIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Academic Scheduler
                </h1>
                <p className="text-gray-600">Sistem Penjadwalan Otomatis</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Tim Akademik
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <SearchIcon className="h-16 w-16 text-gray-400" />
            </div>
            <CardTitle className="text-4xl text-gray-900 mb-2">404</CardTitle>
            <CardTitle className="text-xl text-gray-600">
              Halaman Tidak Ditemukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin URL
              salah atau halaman telah dipindahkan.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              URL yang diakses:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                {location.pathname}
              </code>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Kembali ke Dashboard
                </Button>
              </Link>
              <Link to="/calendar">
                <Button variant="outline" className="w-full sm:w-auto">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Lihat Kalender
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NotFound;
