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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Guest Data</DialogTitle>
          </DialogHeader>
          {editingGuest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="room">Room Number</Label>
                  <Input
                    id="room"
                    value={editingGuest.room}
                    onChange={(e) => setEditingGuest({ ...editingGuest, room: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Guest Name</Label>
                  <Input
                    id="name"
                    value={editingGuest.name}
                    onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adults">Adult</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="0"
                    value={editingGuest.adults}
                    onChange={(e) => setEditingGuest({ ...editingGuest, adults: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="children">Children</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={editingGuest.children}
                    onChange={(e) => setEditingGuest({ ...editingGuest, children: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entitled">Entitled</Label>
                  <Input
                    id="entitled"
                    type="number"
                    min="0"
                    value={editingGuest.entitled}
                    onChange={(e) => setEditingGuest({ ...editingGuest, entitled: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="consumed">Current Consumption</Label>
                  <Input
                    id="consumed"
                    type="number"
                    min="0"
                    max={editingGuest.entitled}
                    value={editingGuest.consumed}
                    onChange={(e) => setEditingGuest({ ...editingGuest, consumed: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reservationId">Reservation ID</Label>
                  <Input
                    id="reservationId"
                    value={editingGuest.reservationId}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfPax">Number of Pax</Label>
                  <Input
                    id="numberOfPax"
                    type="number"
                    min="0"
                    value={editingGuest.numberOfPax}
                    onChange={(e) => setEditingGuest({ ...editingGuest, numberOfPax: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="restaurantLocation">Restaurant Location</Label>
                <Select
                  value={editingGuest.restaurantLocation}
                  onValueChange={(value) => setEditingGuest({ ...editingGuest, restaurantLocation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a restaurant location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Restaurant Utama">Main Restaurant</SelectItem>
                    <SelectItem value="Restaurant Kedua">Second Restaurant</SelectItem>
                    <SelectItem value="Restaurant Ke 3">Restaurant 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             <div>
              <Label htmlFor="transactionSummary">Transaction Summary</Label>
              <Input
                id="transactionSummary"
                value={editingGuest.transactionSummary}
                onChange={(e) =>
                  setEditingGuest({ ...editingGuest, transactionSummary: e.target.value })
                }
                placeholder="Example: Amount per person: Rp 50,000 | Total: Rp 200,000"
                readOnly
              />
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