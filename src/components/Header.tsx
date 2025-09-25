import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Download, LogOut } from 'lucide-react';
import { ExportRange } from '@/types/breakfast';

interface HeaderProps {
  onRefresh: () => void;
  onExport: (range: ExportRange) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, onExport, onLogout }) => {
  const [exportRange, setExportRange] = useState<ExportRange>({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleExport = () => {
    onExport(exportRange);
    setIsExportOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-hotel-primary to-primary shadow-[var(--shadow-card)] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/favicon-96x96.png" 
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Breakfast Control</h1>
              <p className="text-white/80 text-sm hidden sm:block">Breakfast Management System</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Export report CSV</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from">From Date</Label>
                    <Input
                      id="from"
                      type="date"
                      value={exportRange.from}
                      onChange={(e) => setExportRange(prev => ({ ...prev, from: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to">Until Date</Label>
                    <Input
                      id="to"
                      type="date"
                      value={exportRange.to}
                      onChange={(e) => setExportRange(prev => ({ ...prev, to: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleExport} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
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
