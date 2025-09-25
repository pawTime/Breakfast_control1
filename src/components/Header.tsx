import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  Download,
  LogOut,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { ExportRange } from '@/types/breakfast';

interface HeaderProps {
  onRefresh: () => Promise<void> | void;
  onExport: (range: ExportRange) => void;
  onLogout: () => void;
  username: string;
}

const Header: React.FC<HeaderProps> = ({
  onRefresh,
  onExport,
  onLogout,
  username,
}) => {
  const [exportRange, setExportRange] = useState<ExportRange>({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    onExport(exportRange);
    setIsExportOpen(false);
  };

  // 🔄 State untuk animasi refresh
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await onRefresh();
    } finally {
      // kasih jeda biar animasi keliatan smooth
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary to-gray-800 shadow-md text-white">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/favicon-96x96.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Breakfast Control</h1>
            <p className="text-gray-400 text-sm hidden sm:block">
              Breakfast Management System
            </p>
          </div>
        </div>

        {/* User Info + Actions */}
        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex flex-col items-end text-right">
            <span className="font-semibold">{username}</span>
            <div className="flex items-center gap-3 text-sm mt-1">
              {isOnline ? (
                <span className="flex items-center text-green-400">
                  <Wifi className="w-4 h-4 mr-1" /> Online
                </span>
              ) : (
                <span className="flex items-center text-red-400">
                  <WifiOff className="w-4 h-4 mr-1" /> Offline
                </span>
              )}
              <span className="text-gray-300">{time}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Refresh */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            {/* Export */}
            <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-800">
                    📊 Export Report
                  </DialogTitle>
                  <p className="text-sm text-gray-500">
                    Pilih rentang tanggal untuk mengekspor laporan tamu.
                  </p>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Input Date Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from" className="text-sm font-medium">
                        From Date
                      </Label>
                      <Input
                        id="from"
                        type="date"
                        value={exportRange.from}
                        onChange={(e) =>
                          setExportRange((prev) => ({
                            ...prev,
                            from: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="to" className="text-sm font-medium">
                        Until Date
                      </Label>
                      <Input
                        id="to"
                        type="date"
                        value={exportRange.to}
                        onChange={(e) =>
                          setExportRange((prev) => ({
                            ...prev,
                            to: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Preview info */}
                  <div className="p-3 rounded-lg border bg-gray-50 text-sm">
                    <p className="text-gray-600">
                      Rentang:{' '}
                      <span className="font-medium text-gray-800">
                        {exportRange.from} → {exportRange.to}
                      </span>
                    </p>
                    <p className="text-gray-500 mt-1">
                      File akan diekspor dalam format{' '}
                      <span className="font-semibold">CSV</span>.
                    </p>
                  </div>

                  {/* Download button */}
                  <Button
                    onClick={handleExport}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Logout */}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
