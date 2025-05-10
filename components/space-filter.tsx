"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StudySpace } from "@/types/study-space";
import { ListFilter } from "lucide-react";
import { useId, useState, useEffect } from "react";

interface SpaceFilterProps {
  onApplyFilters: (filters: { categories: string[]; stations: string[] }) => void;
  allSpaces: StudySpace[]; // Pass all spaces to extract filter options
}

export function SpaceFilter({ onApplyFilters, allSpaces }: SpaceFilterProps) {
  const id = useId();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [uniqueStations, setUniqueStations] = useState<string[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set(allSpaces.map(space => space.category)));
    const stations = Array.from(new Set(allSpaces.map(space => space.nearestStation)));
    setUniqueCategories(categories);
    setUniqueStations(stations);
  }, [allSpaces]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStationChange = (station: string) => {
    setSelectedStations(prev =>
      prev.includes(station)
        ? prev.filter(s => s !== station)
        : [...prev, station]
    );
  };

  const handleApply = () => {
    onApplyFilters({ categories: selectedCategories, stations: selectedStations });
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedStations([]);
    onApplyFilters({ categories: [], stations: [] }); // Also apply empty filters
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Filters" className="bg-purple-800/70 border-purple-700/50 text-white hover:bg-purple-700/70 hover:text-white focus:ring-purple-500 flex items-center gap-2">
          <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          <span>Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 space-y-4">
        <div className="text-sm font-medium text-black text-muted-foreground">Filters</div>
        
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">Category</div>
          {uniqueCategories.map((category, index) => (
            <div key={`${id}-cat-${index}`} className="flex items-center gap-2">
              <Checkbox
                id={`${id}-cat-${index}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`${id}-cat-${index}`} className="font-normal text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>

        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-4 my-2 h-px bg-border"
        ></div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">Nearest Station</div>
          {uniqueStations.map((station, index) => (
            <div key={`${id}-stat-${index}`} className="flex items-center gap-2">
              <Checkbox
                id={`${id}-stat-${index}`}
                checked={selectedStations.includes(station)}
                onCheckedChange={() => handleStationChange(station)}
              />
              <Label htmlFor={`${id}-stat-${index}`} className="font-normal text-sm">
                {station}
              </Label>
            </div>
          ))}
        </div>

        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-4 my-2 h-px bg-border"
        ></div>

        <div className="flex justify-end gap-2 pt-2">
          <Button size="sm" variant="outline" className="h-8 px-3" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" className="h-8 px-3" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
