import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import SearchFilters from './SearchFilters';
import GuestTable from './GuestTable';
import { Guest, FilterType, ExportRange } from '@/types/breakfast';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    showEntitled: false,
    showConsumed: false
  });

  // Sample data - in real app, this would come from an API
  useEffect(() => {
  const sampleGuests: Guest[] = [
    { id: '1', room: '101', name: 'Budi Santoso', adults: 2, children: 1, entitled: 3, consumed: 2, checkInDate: '2024-01-15', reservationId: 'RSV001', numberOfPax: 3, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $150' },
    { id: '2', room: '102', name: 'Sari Indah', adults: 1, children: 0, entitled: 1, consumed: 0, checkInDate: '2024-01-15', reservationId: 'RSV002', numberOfPax: 1, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $50' },
    { id: '3', room: '103', name: 'Ahmad Rahman', adults: 2, children: 2, entitled: 4, consumed: 4, checkInDate: '2024-01-14', reservationId: 'RSV003', numberOfPax: 4, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $180' },
    { id: '4', room: '201', name: 'Linda Wijaya', adults: 1, children: 1, entitled: 2, consumed: 1, checkInDate: '2024-01-15', reservationId: 'RSV004', numberOfPax: 2, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $80' },
    { id: '5', room: '202', name: 'David Chen', adults: 2, children: 0, entitled: 2, consumed: 0, checkInDate: '2024-01-16', reservationId: 'RSV005', numberOfPax: 2, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $100' },
    { id: '6', room: '203', name: 'Maria Santos', adults: 1, children: 0, entitled: 1, consumed: 1, checkInDate: '2024-01-14', reservationId: 'RSV006', numberOfPax: 1, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $40' },
    { id: '7', room: '204', name: 'Rudi Hartono', adults: 2, children: 1, entitled: 3, consumed: 3, checkInDate: '2024-01-16', reservationId: 'RSV007', numberOfPax: 3, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $135' },
    { id: '8', room: '205', name: 'Fiona Putri', adults: 1, children: 2, entitled: 3, consumed: 1, checkInDate: '2024-01-17', reservationId: 'RSV008', numberOfPax: 3, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $150' },
    { id: '9', room: '301', name: 'Agus Prasetyo', adults: 2, children: 0, entitled: 2, consumed: 2, checkInDate: '2024-01-16', reservationId: 'RSV009', numberOfPax: 2, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $80' },
    { id: '10', room: '302', name: 'Tina Marlina', adults: 1, children: 1, entitled: 2, consumed: 2, checkInDate: '2024-01-17', reservationId: 'RSV010', numberOfPax: 2, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $90' },
    { id: '11', room: '303', name: 'Eko Saputra', adults: 3, children: 1, entitled: 4, consumed: 3, checkInDate: '2024-01-18', reservationId: 'RSV011', numberOfPax: 4, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $200' },
    { id: '12', room: '304', name: 'Nina Lestari', adults: 2, children: 2, entitled: 4, consumed: 4, checkInDate: '2024-01-18', reservationId: 'RSV012', numberOfPax: 4, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $160' },
    { id: '13', room: '305', name: 'Bambang Sutrisno', adults: 1, children: 0, entitled: 1, consumed: 0, checkInDate: '2024-01-19', reservationId: 'RSV013', numberOfPax: 1, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $45' },
    { id: '14', room: '401', name: 'Dewi Anggraeni', adults: 2, children: 1, entitled: 3, consumed: 2, checkInDate: '2024-01-19', reservationId: 'RSV014', numberOfPax: 3, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $150' },
    { id: '15', room: '402', name: 'Joko Widodo', adults: 1, children: 0, entitled: 1, consumed: 1, checkInDate: '2024-01-20', reservationId: 'RSV015', numberOfPax: 1, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $40' },
    { id: '16', room: '403', name: 'Rina Marlina', adults: 2, children: 2, entitled: 4, consumed: 4, checkInDate: '2024-01-20', reservationId: 'RSV016', numberOfPax: 4, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $180' },
    { id: '17', room: '404', name: 'Hendra Saputra', adults: 1, children: 1, entitled: 2, consumed: 2, checkInDate: '2024-01-21', reservationId: 'RSV017', numberOfPax: 2, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $100' },
    { id: '18', room: '405', name: 'Sinta Wijaya', adults: 2, children: 0, entitled: 2, consumed: 1, checkInDate: '2024-01-21', reservationId: 'RSV018', numberOfPax: 2, restaurantLocation: 'Restaurant 3', transactionSummary: 'Amount per pax: $40 | Total: $80' },
    { id: '19', room: '501', name: 'Rudi Hartanto', adults: 3, children: 1, entitled: 4, consumed: 4, checkInDate: '2024-01-22', reservationId: 'RSV019', numberOfPax: 4, restaurantLocation: 'Second Restaurant', transactionSummary: 'Amount per pax: $45 | Total: $180' },
    { id: '20', room: '502', name: 'Maya Sari', adults: 2, children: 1, entitled: 3, consumed: 3, checkInDate: '2024-01-22', reservationId: 'RSV020', numberOfPax: 3, restaurantLocation: 'Main Restaurant', transactionSummary: 'Amount per pax: $50 | Total: $150' },
  ];

  setGuests(sampleGuests);
}, []);


  // Filter guests based on search and filter criteria
  const filteredGuests = useMemo(() => {
    let result = guests;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(guest => 
        guest.room.toLowerCase().includes(searchLower) || 
        guest.name.toLowerCase().includes(searchLower)
      );
    }

    // Status filters
    if (filters.showEntitled && !filters.showConsumed) {
      result = result.filter(guest => guest.consumed === 0);
    } else if (filters.showConsumed && !filters.showEntitled) {
      result = result.filter(guest => guest.consumed > 0);
    } else if (filters.showEntitled && filters.showConsumed) {
      result = result.filter(guest => guest.consumed > 0 && guest.consumed < guest.entitled);
    }

    return result;
  }, [guests, filters]);

  const handleRefresh = () => {
    toast({
      title: "Data diperbarui",
      description: "Data tamu telah dimuat ulang",
    });
  };

  const handleExport = (range: ExportRange) => {
    // In real app, this would generate actual CSV
    const csvContent = [
      ['Kamar', 'Nama Tamu', 'Dewasa', 'Anak', 'Hak Sarapan', 'Konsumsi', 'Check In', 'ID Reservasi', 'Jumlah Tamu', 'Lokasi Restoran', 'Ringkasan Transaksi'].join(','),
      ...filteredGuests.map(guest => 
        [guest.room, guest.name, guest.adults, guest.children, guest.entitled, guest.consumed, guest.checkInDate, guest.reservationId, guest.numberOfPax, guest.restaurantLocation, guest.transactionSummary].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `laporan-sarapan-${range.from}-${range.to}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Ekspor berhasil",
      description: `Laporan periode ${range.from} sampai ${range.to} telah diunduh`,
    });
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    setGuests(prev => prev.map(guest => 
      guest.id === updatedGuest.id ? updatedGuest : guest
    ));

    toast({
      title: "Data diperbarui",
      description: `Data untuk kamar ${updatedGuest.room} telah diperbarui`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onRefresh={handleRefresh}
        onExport={handleExport}
        onLogout={onLogout}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          guests={guests}
        />
        
        <GuestTable
          guests={filteredGuests}
          onUpdateGuest={handleUpdateGuest}
        />
        
        {filteredGuests.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Tidak ada data tamu yang sesuai dengan kriteria pencarian</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;