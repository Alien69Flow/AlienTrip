import { Heart } from "lucide-react";
import { useUser, Favorite } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  item: Favorite;
  className?: string;
}

export const FavoriteButton = ({ item, className }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useUser();
  const active = isFavorite(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item);
      }}
      className={cn(
        "p-2 rounded-full transition-all duration-300",
        active 
          ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" 
          : "bg-background/50 backdrop-blur-md text-muted-foreground hover:bg-background/80 hover:text-foreground",
        className
      )}
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <Heart className={cn("w-5 h-5 transition-transform duration-300", active && "fill-current scale-110")} />
    </button>
  );
};
