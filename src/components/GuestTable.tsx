import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Users, Baby } from 'lucide-react';
import { Guest } from '@/types/breakfast';

interface GuestTableProps {
  guests: Guest[];
  onUpdateGuest: (guest: Guest) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onUpdateGuest }) => {
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (guest: Guest) => {
    setEditingGuest({ ...guest });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingGuest) {
      onUpdateGuest(editingGuest);
      setIsDialogOpen(false);
      setEditingGuest(null);
    }
  };


  const getConsumedBadge = (consumed: number, entitled: number) => {
    if (consumed === 0) {
      return <Badge variant="outline" className="bg-hotel-gray-light text-hotel-gray">Have not eaten</Badge>;
    }
    if (consumed >= entitled) {
      return <Badge className="bg-hotel-success text-white">It's finished</Badge>;
    }
    return <Badge className="bg-hotel-warning text-white">{consumed}/{entitled}</Badge>;
  };

  return (
    <>
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-hotel-primary" />
            Guest Data ({guests.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-hotel-gray-light/50">
                  <TableHead className="font-semibold">Room</TableHead>
                  <TableHead className="font-semibold">Guest Name</TableHead>
                  <TableHead className="font-semibold text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-4 h-4" />
                      Adult
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Baby className="w-4 h-4" />
                      Children
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-hotel-gray-light/30">
                    <TableCell className="font-medium">{guest.room}</TableCell>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell className="text-center">{guest.adults}</TableCell>
                    <TableCell className="text-center">{guest.children}</TableCell>
                    <TableCell className="text-center">
                      {getConsumedBadge(guest.consumed, guest.entitled)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(guest)}
                        className="h-8 px-3"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-lg font-bold text-hotel-primary">
        Update Breakfast Data
      </DialogTitle>
    </DialogHeader>
    {editingGuest && (
      <div className="space-y-6">
        
        {/* Guest Info */}
        <div className="border-l-4 border-hotel-primary bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">
                Room: <span className="font-semibold text-hotel-primary">{editingGuest.room}</span>
              </p>
              <p className="text-sm">
                Reservation: <span className="font-medium">{editingGuest.reservationId}</span>
              </p>
              <p className="text-sm">
                Guest: <span className="font-medium">{editingGuest.name}</span>
              </p>
            </div>
            <div className="text-right text-sm space-y-1">
              <p>👤 {editingGuest.adults} Adults</p>
              <p>🧒 {editingGuest.children} Children</p>
              <p>🎟 {editingGuest.entitled} Entitled</p>
            </div>
          </div>
        </div>

        {/* Current Consumption */}
        <div>
          <Label className="flex items-center gap-2 text-sm font-medium">
            🍽 Current Consumption
          </Label>
          <Input
            type="number"
            min={0}
            max={editingGuest.entitled}
            value={editingGuest.consumed}
            onChange={(e) =>
              setEditingGuest({
                ...editingGuest,
                consumed: parseInt(e.target.value) || 0,
              })
            }
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Remaining Quota: {editingGuest.entitled - editingGuest.consumed}
          </p>
        </div>

        {/* Number of guests */}
        <div>
          <Label className="flex items-center gap-2 text-sm font-medium">
            👥 Number of guests
          </Label>
          <Input
            type="number"
            min={0}
            max={editingGuest.entitled - editingGuest.consumed}
            value={editingGuest.numberOfPax}
            onChange={(e) =>
              setEditingGuest({
                ...editingGuest,
                numberOfPax: parseInt(e.target.value) || 0,
              })
            }
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum {editingGuest.entitled - editingGuest.consumed} remaining
            guests
          </p>
        </div>

        {/* Restaurant Location */}
        <div>
          <Label className="flex items-center gap-2 text-sm font-medium">
            📍 Restaurant Location
          </Label>
          <Select
            value={editingGuest.restaurantLocation}
            onValueChange={(value) =>
              setEditingGuest({ ...editingGuest, restaurantLocation: value })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cafe Lobby">Cafe Lobby</SelectItem>
              <SelectItem value="Restaurant Utama">Main Restaurant</SelectItem>
              <SelectItem value="Restaurant Kedua">Second Restaurant</SelectItem>
              <SelectItem value="Restaurant Ke 3">Restaurant 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transaction Summary */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            💳 Transaction Summary
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Price per guest:</div>
            <div className="font-medium text-right">Rp 85.000</div>

            <div className="text-gray-600">Guests:</div>
            <div className="font-medium text-right">{editingGuest.numberOfPax}</div>

            <div className="col-span-2 border-t mt-2 pt-2 flex justify-between font-semibold text-hotel-primary">
              <span>Total:</span>
              <span>
                Rp {(85000 * editingGuest.numberOfPax).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    )}
  </DialogContent>
</Dialog>

    </>
  );
};

export default GuestTable;