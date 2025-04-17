
import { useState } from "react";
import { SortOption } from "../types/portfolio";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown 
} from "lucide-react";

interface SearchFilterBarProps {
  onSearchChange: (value: string) => void;
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'alphabetical', label: 'A to Z' },
  { value: 'changeToday', label: '% Change Today' },
  { value: 'ltp', label: 'LTP' },
  { value: 'pnlAbsolute', label: 'P&L Absolute' },
  { value: 'pnlPercent', label: 'P&L Percent' },
  { value: 'invested', label: 'Invested Value' },
];

const SearchFilterBar = ({ 
  onSearchChange, 
  onSortChange, 
  currentSort 
}: SearchFilterBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label;

  return (
    <div className="flex flex-col mb-4 space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search stocks..."
          className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="relative">
        <button
          className="flex items-center justify-between w-full h-10 px-3 py-2 text-sm border border-input rounded-md bg-background hover:bg-accent focus:outline-none"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className="flex items-center">
            <SlidersHorizontal size={16} className="mr-2 text-muted-foreground" />
            <span>Sort: {currentSortLabel}</span>
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>
        
        {isFilterOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
            <ul className="py-1">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${
                      currentSort === option.value ? "bg-accent font-medium" : ""
                    }`}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsFilterOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
