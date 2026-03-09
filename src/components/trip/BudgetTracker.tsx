import { Booking } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface BudgetTrackerProps {
  bookings: Booking[];
  totalBudget?: number;
}

const categoryLabels: Record<string, string> = {
  flight: "Vuelos",
  stay: "Alojamiento",
  activity: "Actividades",
  rental: "Alquiler",
  restaurant: "Restaurantes",
  package: "Paquetes",
  coliving: "Coliving",
};

const BudgetTracker = ({ bookings, totalBudget }: BudgetTrackerProps) => {
  const totalSpent = bookings.reduce((sum, b) => sum + b.price, 0);
  const remaining = totalBudget ? totalBudget - totalSpent : 0;
  const percent = totalBudget ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const overBudget = totalBudget ? totalSpent > totalBudget : false;

  // Group by category
  const categories = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.type] = (acc[b.type] || 0) + b.price;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categories).sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-4">
      {/* Total overview */}
      <Card className="glass border-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Resumen de Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-3xl font-display font-bold text-foreground">{totalSpent}€</div>
              {totalBudget && (
                <div className="text-sm text-muted-foreground">de {totalBudget}€ presupuestados</div>
              )}
            </div>
            {totalBudget && (
              <div className="flex items-center gap-1.5">
                {overBudget ? (
                  <>
                    <AlertTriangle size={16} className="text-destructive" />
                    <span className="text-sm text-destructive font-medium">+{Math.abs(remaining)}€ excedido</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="text-primary" />
                    <span className="text-sm text-primary font-medium">{remaining}€ disponible</span>
                  </>
                )}
              </div>
            )}
          </div>
          {totalBudget && (
            <Progress value={percent} className="h-2" />
          )}
        </CardContent>
      </Card>

      {/* Category breakdown */}
      {sortedCategories.length > 0 && (
        <Card className="glass border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Desglose por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedCategories.map(([type, amount]) => {
              const catPercent = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              return (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{categoryLabels[type] || type}</span>
                    <span className="text-foreground font-medium">{amount}€</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-500"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetTracker;
