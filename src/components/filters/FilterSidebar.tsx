import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  categories: { id: string; label: string }[];
  maxPrice?: number;
  onFilterChange: (filters: any) => void;
}

export const FilterSidebar = ({ categories, maxPrice = 1000, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleApply = () => {
    onFilterChange({ priceRange, minRating, categories: selectedCategories });
  };

  const handleReset = () => {
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setSelectedCategories([]);
    onFilterChange({ priceRange: [0, maxPrice], minRating: 0, categories: [] });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full md:w-64 space-y-8 glass p-6 rounded-2xl h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Filtros</h3>
        <button onClick={handleReset} className="text-muted-foreground hover:text-primary transition-colors" title="Limpiar">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Precio</Label>
          <span className="text-sm text-muted-foreground">{priceRange[0]}€ - {priceRange[1]}€</span>
        </div>
        <Slider
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
      </div>

      <div className="space-y-4">
        <Label>Categorías</Label>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox 
                id={cat.id} 
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <label htmlFor={cat.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Valoración mínima</Label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(star)}
              className="focus:outline-none"
            >
              <Star 
                size={20} 
                className={star <= minRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} 
              />
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full neon-glow" onClick={handleApply}>
        Aplicar filtros
      </Button>
    </div>
  );
};
