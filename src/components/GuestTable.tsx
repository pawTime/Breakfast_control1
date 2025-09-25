import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Baby } from 'lucide-react';
import { Guest } from '@/types/breakfast';

interface GuestCardProps {
  guests: Guest[];
  onUpdateGuest: (guest: Guest) => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ guests, onUpdateGuest }) => {
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (guest: Guest) => {
    setEditingGuest({ ...guest });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingGuest) {
      onUpdateGuest(editingGuest);
      setEditingGuest(null);
      setIsDialogOpen(false);
    }
  };

  const getConsumedBadge = (consumed: number, entitled: number) => {
    if (consumed === 0) {
      return <Badge variant="outline" className="bg-gray-200 text-gray-600">Have not eaten</Badge>;
    }
    if (consumed >= entitled) {
      return <Badge className="bg-green-500 text-white">It's finished</Badge>;
    }
    return <Badge className="bg-orange-500 text-white">{consumed}/{entitled}</Badge>;
  };

  const getBorderColor = (consumed: number, entitled: number) => {
    if (consumed === 0) return "border-gray-300";
    if (consumed >= entitled) return "border-green-500";
    return "border-orange-500";
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guests.map((guest) => {
          const isFinished = guest.consumed >= guest.entitled;

          return (
            <Card
              key={guest.id}
              className={`shadow-md hover:shadow-lg transition relative border-l-4 ${getBorderColor(
                guest.consumed,
                guest.entitled
              )}`}
            >
              {/* Badge di pojok kanan atas */}
              <div className="absolute top-2 right-2">
                {getConsumedBadge(guest.consumed, guest.entitled)}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{guest.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600"># Room: {guest.room}</p>
                <p className="text-sm">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 text-xs">
                    Reservation: {guest.reservationId}
                  </span>
                </p>
                <div className="flex items-center gap-4 text-sm mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {guest.adults}
                  </span>
                  <span className="flex items-center gap-1">
                    <Baby className="w-4 h-4" /> {guest.children}
                  </span>
                </div>
                <p className="text-sm text-gray-700">Consumed: {guest.consumed}</p>
              </CardContent>

              <div className="px-9 pb-9">
                <Button
                  onClick={() => handleEdit(guest)}
                  className="w-full bg-blue-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isFinished} // ✅ jika sudah finished → disable
                >
                  Update
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Dialog Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-hotel-primary tracking-wide">
              ✨ Update Breakfast Data
            </DialogTitle>
          </DialogHeader>

          {editingGuest && (
            <div className="space-y-6">
              {/* Guest Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow">
                <div>
                  <p className="text-xs text-gray-500">Room</p>
                  <p className="font-semibold text-gray-800">{editingGuest.room}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Reservation ID</p>
                  <p className="font-semibold text-gray-800">{editingGuest.reservationId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Guest</p>
                  <p className="font-semibold text-gray-800">{editingGuest.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Entitled</p>
                  <p className="font-semibold text-gray-800">{editingGuest.entitled}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Adults</p>
                  <p className="font-semibold text-gray-800">{editingGuest.adults}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Children</p>
                  <p className="font-semibold text-gray-800">{editingGuest.children}</p>
                </div>
              </div>
              
              {/* Consumption Section */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                  Consumption
                </h4>

                <Input
                  type="number"
                  min={0}
                  max={editingGuest.entitled}
                  value={editingGuest.consumed}
                  onChange={(e) =>
                    setEditingGuest({
                      ...editingGuest,
                      consumed: Math.min(parseInt(e.target.value) || 0, editingGuest.entitled), // ✅ auto clamp
                    })
                  }
                  disabled={editingGuest.consumed >= editingGuest.entitled} 
                  // ✅ hanya disable kalau status "It's finished"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Remaining Quota:{" "}
                  <span className="font-medium text-gray-700">
                    {editingGuest.entitled - editingGuest.consumed}
                  </span>
                </p>
              </div>


              {/* Pax Section */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  Guests Count
                </h4>
                <Input
                  type="number"
                  min={0}
                  max={editingGuest.entitled - editingGuest.consumed}
                  value={editingGuest.numberOfPax}
                  onChange={(e) =>
                    setEditingGuest({ ...editingGuest, numberOfPax: parseInt(e.target.value) || 0 })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum {editingGuest.entitled - editingGuest.consumed} remaining guests
                </p>
              </div>

              {/* Restaurant Location */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Restaurant Location
                </h4>
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
                    <SelectItem value="Main Restaurant">Main Restaurant</SelectItem>
                    <SelectItem value="Second Restaurant">Second Restaurant</SelectItem>
                    <SelectItem value="Restaurant 3">Restaurant 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 shadow">
                <h4 className="font-semibold text-purple-700 mb-2">💳 Transaction Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Price per guest</span>
                  <span className="font-medium">Rp 85.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Consumed</span>
                  <span className="font-medium">{editingGuest.consumed}</span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-purple-700">
                  <span>Total</span>
                  <span>
                    Rp {(85000 * editingGuest.consumed).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuestCard;
