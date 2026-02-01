"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  BarChart3,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mot de passe simple pour la démo (en production, utiliser une vraie auth)
const ADMIN_PASSWORD = "taxibrk2024";

interface StoredEvent {
  event: string;
  params?: Record<string, unknown>;
  timestamp: string;
}

interface Reservation {
  timestamp: string;
  price?: number;
  distance?: string;
  service_type?: string;
  [key: string]: unknown;
}

interface Contact {
  timestamp: string;
  subject?: string;
  [key: string]: unknown;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const auth = sessionStorage.getItem("taxi_brk_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Charger les données
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    try {
      const storedEvents = JSON.parse(
        localStorage.getItem("taxi_brk_events") || "[]"
      );
      const storedReservations = JSON.parse(
        localStorage.getItem("taxi_brk_reservations") || "[]"
      );
      const storedContacts = JSON.parse(
        localStorage.getItem("taxi_brk_contacts") || "[]"
      );

      setEvents(storedEvents);
      setReservations(storedReservations);
      setContacts(storedContacts);
      setLastRefresh(new Date());
    } catch {
      // Ignorer les erreurs de parsing
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("taxi_brk_admin_auth", "true");
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("taxi_brk_admin_auth");
    setPassword("");
  };

  // Statistiques calculées
  const stats = {
    totalEvents: events.length,
    totalReservations: reservations.length,
    totalContacts: contacts.length,
    phoneClicks: events.filter((e) => e.event === "phone_click").length,
    whatsappClicks: events.filter((e) => e.event === "whatsapp_click").length,
    reservationsStarted: events.filter((e) => e.event === "reservation_started")
      .length,
    reservationsCompleted: events.filter(
      (e) => e.event === "reservation_completed"
    ).length,
    pricesCalculated: events.filter((e) => e.event === "price_calculated")
      .length,
  };

  const conversionRate =
    stats.reservationsStarted > 0
      ? ((stats.reservationsCompleted / stats.reservationsStarted) * 100).toFixed(
          1
        )
      : "0";

  // Événements des dernières 24h
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentEvents = events.filter(
    (e) => new Date(e.timestamp) > last24h
  ).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card-premium text-center">
            <div className="w-16 h-16 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white mb-2">
              Administration
            </h1>
            <p className="text-gray-400 mb-6">
              Accès réservé aux administrateurs
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button type="submit" className="btn-gold w-full">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">
              Tableau de bord
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Dernière mise à jour : {lastRefresh.toLocaleTimeString("fr-FR")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="btn-gold-outline flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Calendar}
            label="Réservations"
            value={stats.totalReservations}
            subtext="Total"
          />
          <StatCard
            icon={Users}
            label="Contacts"
            value={stats.totalContacts}
            subtext="Formulaires"
          />
          <StatCard
            icon={Phone}
            label="Appels"
            value={stats.phoneClicks}
            subtext="Clics téléphone"
          />
          <StatCard
            icon={MessageCircle}
            label="WhatsApp"
            value={stats.whatsappClicks}
            subtext="Clics"
          />
        </div>

        {/* Conversion Funnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card-premium">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold-400" />
              Entonnoir de conversion
            </h2>
            <div className="space-y-3">
              <FunnelStep
                label="Réservations commencées"
                value={stats.reservationsStarted}
                percentage={100}
              />
              <FunnelStep
                label="Prix calculés"
                value={stats.pricesCalculated}
                percentage={
                  stats.reservationsStarted > 0
                    ? (stats.pricesCalculated / stats.reservationsStarted) * 100
                    : 0
                }
              />
              <FunnelStep
                label="Réservations complétées"
                value={stats.reservationsCompleted}
                percentage={
                  stats.reservationsStarted > 0
                    ? (stats.reservationsCompleted / stats.reservationsStarted) *
                      100
                    : 0
                }
                highlight
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gold-400/20">
              <p className="text-gray-400 text-sm">
                Taux de conversion :{" "}
                <span className="text-gold-400 font-semibold">
                  {conversionRate}%
                </span>
              </p>
            </div>
          </div>

          <div className="card-premium">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-400" />
              Activité récente
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                <span className="text-gray-400">Événements (24h)</span>
                <span className="text-white font-semibold">{recentEvents}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                <span className="text-gray-400">Total événements</span>
                <span className="text-white font-semibold">
                  {stats.totalEvents}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Interactions totales</span>
                <span className="text-white font-semibold">
                  {stats.phoneClicks + stats.whatsappClicks}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="card-premium mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold-400" />
            Dernières réservations
          </h2>
          {reservations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucune réservation enregistrée
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold-400/20">
                    <th className="text-left text-gray-400 text-sm py-2">
                      Date
                    </th>
                    <th className="text-left text-gray-400 text-sm py-2">
                      Prix
                    </th>
                    <th className="text-left text-gray-400 text-sm py-2">
                      Distance
                    </th>
                    <th className="text-left text-gray-400 text-sm py-2">
                      Service
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations
                    .slice(-10)
                    .reverse()
                    .map((res, index) => (
                      <tr
                        key={index}
                        className="border-b border-gold-400/10 last:border-0"
                      >
                        <td className="py-3 text-white text-sm">
                          {new Date(res.timestamp).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 text-gold-400 font-semibold text-sm">
                          {res.price ? `${res.price}€` : "-"}
                        </td>
                        <td className="py-3 text-gray-300 text-sm">
                          {res.distance || "-"}
                        </td>
                        <td className="py-3 text-gray-300 text-sm">
                          {res.service_type || "Standard"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Events Log */}
        <div className="card-premium">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gold-400" />
            Journal des événements
          </h2>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun événement enregistré
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {events
                .slice(-20)
                .reverse()
                .map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-black-100/50 hover:bg-black-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <EventBadge event={event.event} />
                      <span className="text-white text-sm">{event.event}</span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(event.timestamp).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composants auxiliaires
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  subtext: string;
}) {
  return (
    <div className="card-premium text-center">
      <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-gold-400" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-gray-500 text-xs mt-1">{subtext}</p>
    </div>
  );
}

function FunnelStep({
  label,
  value,
  percentage,
  highlight = false,
}: {
  label: string;
  value: number;
  percentage: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={highlight ? "text-gold-400" : "text-gray-300"}>
          {label}
        </span>
        <span className="text-white font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-black-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            highlight ? "bg-gold-400" : "bg-gold-400/50"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function EventBadge({ event }: { event: string }) {
  const colors: Record<string, string> = {
    reservation_started: "bg-blue-500/20 text-blue-400",
    reservation_completed: "bg-green-500/20 text-green-400",
    phone_click: "bg-gold-400/20 text-gold-400",
    whatsapp_click: "bg-emerald-500/20 text-emerald-400",
    contact_form_submitted: "bg-purple-500/20 text-purple-400",
    price_calculated: "bg-cyan-500/20 text-cyan-400",
  };

  const color = colors[event] || "bg-gray-500/20 text-gray-400";

  return <div className={`w-2 h-2 rounded-full ${color.split(" ")[0]}`} />;
}
