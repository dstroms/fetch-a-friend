import { Button } from "@components/app/components/button";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortByBarProps {
  sortBy: string;
  onSort: (type: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
}

export function SortByBar({
  sortBy,
  onSort,
  sortDirection,
  setSortDirection,
}: SortByBarProps) {
  const sortOptions = ["age", "breed", "name"];
  return (
    <div className="flex gap-2 items-center bg-gray-900 p-2 sm:p-4 text-sm">
      <div className="text-sm">Sort by</div>
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <Button
            key={option}
            onClick={() => onSort(option)}
            variant={sortBy === option ? "primary" : "secondary"}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Button>
        ))}
        <Button
          onClick={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
          variant="secondary"
          title={`Sort dogs by ${
            sortDirection === "asc" ? "descending" : "ascending"
          }`}
        >
          {sortDirection === "asc" ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
