import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (pin === '1234' || pin === '0000') {
      onLogin();
    } else {
      alert('PIN salah. Gunakan 1234 atau 0000 untuk demo.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/food-background-breakfast-with-yogurt-granola-or-muesli-strawberries-banner-image-for-website-photo.jpg')" }}
    >
      {/* Glass effect card with dark overlay */}
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-6">
          {/* Logo */}
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 shadow-md bg-white/80 backdrop-blur-sm">
            <img 
              src="/favicon-96x96.png"
              alt="Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-white drop-shadow-md">
            Breakfast Control
          </CardTitle>
          <CardDescription className="text-white/80">
            Hotel Breakfast Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="pin" className="text-sm font-medium text-white block mb-2">
                Enter PIN
              </label>
              <Input
                id="pin"
                type="password"
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center text-xl tracking-widest h-12 bg-white/80 border-white/30 placeholder:text-gray-600"
                maxLength={4}
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg text-white font-semibold"
            >
              Enter
            </Button>
            <p className="text-xs text-white/80 text-center">
              Demo: PIN <b>1234</b> , <b>0000</b>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
