import { Map, List, LayoutGrid } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ViewMode = "list" | "map" | "split";

interface FilterBarProps {
  viewMode: ViewMode;
  onViewChange: (value: ViewMode) => void;
  resultCount: number;
  onSortChange: (value: string) => void;
}

export const FilterBar = ({ viewMode, onViewChange, resultCount, onSortChange }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 glass p-2 px-4 rounded-xl">
      <div className="text-sm text-muted-foreground">
        Mostrando <span className="font-bold text-foreground">{resultCount}</span> resultados
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Select onValueChange={onSortChange} defaultValue="recommended">
          <SelectTrigger className="w-[180px] bg-background/50 border-none h-9">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recomendados</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="rating">Mejor valorados</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && onViewChange(v as ViewMode)} className="bg-background/50 rounded-lg p-1">
          <ToggleGroupItem value="list" aria-label="Vista lista" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
            <List size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem value="split" aria-label="Vista dividida" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hidden md:flex">
            <LayoutGrid size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Vista mapa" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
            <Map size={18} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
