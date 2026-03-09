import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TripCard from "@/components/trip/TripCard";
import { User, Heart, Calendar, Settings, MapPin, Plane, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { profile, updateProfile, bookings, favorites, trips } = useUser();
  const [editProfile, setEditProfile] = useState(profile);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editProfile);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 border-2 border-primary/20">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Hola, {profile.name}</h1>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg mb-8">
            <TabsTrigger value="trips" className="gap-2"><Route size={16} /> Mis Viajes</TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2"><Calendar size={16} /> Reservas</TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2"><Heart size={16} /> Favoritos</TabsTrigger>
            <TabsTrigger value="profile" className="gap-2"><User size={16} /> Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="grid gap-4">
              {bookings.length === 0 ? (
                <Card className="glass border-none text-center py-12">
                  <CardContent className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Plane size={48} className="opacity-20" />
                    <p>Aún no tienes reservas.</p>
                    <Button variant="outline" onClick={() => window.location.href = "/"}>Explorar destinos</Button>
                  </CardContent>
                </Card>
              ) : (
                bookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass border-none overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {booking.image && (
                          <div className="w-full md:w-48 h-32 md:h-auto">
                            <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <CardHeader className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl mb-1">{booking.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar size={14} /> {booking.date}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary">{booking.price}€</div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-secondary text-muted-foreground'
                              }`}>
                                {booking.status === 'confirmed' ? 'Confirmada' :
                                 booking.status === 'pending' ? 'Pendiente' : 'Completada'}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No tienes favoritos guardados todavía.</p>
                </div>
              ) : (
                favorites.map((fav, i) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl overflow-hidden group"
                  >
                    <div className="relative h-48">
                      {fav.image ? (
                        <img src={fav.image} alt={fav.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <MapPin size={32} className="text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-primary font-medium mb-1 uppercase tracking-wider">{fav.type}</div>
                      <h3 className="font-semibold text-lg mb-2">{fav.title}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <div className="font-bold text-lg">{fav.price}€</div>
                        <Button size="sm" variant="secondary">Ver detalles</Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="glass border-none max-w-2xl">
              <CardHeader>
                <CardTitle>Configuración de Perfil</CardTitle>
                <CardDescription>Actualiza tu información personal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">URL del Avatar</Label>
                    <Input 
                      id="avatar" 
                      value={editProfile.avatar}
                      onChange={(e) => setEditProfile({...editProfile, avatar: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto mt-4 neon-glow">
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
