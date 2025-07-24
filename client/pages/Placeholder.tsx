import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowLeftIcon, ConstructionIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
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
                <h1 className="text-2xl font-bold text-gray-900">Academic Scheduler</h1>
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
              <ConstructionIcon className="h-16 w-16 text-gray-400" />
            </div>
            <CardTitle className="text-2xl text-gray-900">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {description}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Halaman ini sedang dalam tahap pengembangan. Silakan kembali ke dashboard 
              atau hubungi tim pengembang untuk informasi lebih lanjut.
            </p>
            <div className="space-y-3">
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  Kembali ke Dashboard
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                Atau lanjutkan memberikan prompt untuk mengisi konten halaman ini
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
