"use client";
import { useEffect, useState } from "react";
import { FiltersParams } from "@components/app/types/filters.types";
import { Select } from "@headlessui/react";
import { Button } from "@components/app/components/button/button";

interface SidebarFiltersProps {
  filters: FiltersParams;
  onSetFilters: (updater: (prev: FiltersParams) => FiltersParams) => void;
  onSubmit: () => void;
}

const SidebarFilters = ({
  filters,
  onSetFilters,
  onSubmit,
}: SidebarFiltersProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBreeds = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch breeds: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-red-500">Error loading breeds</h1>
        <div>{error}</div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onSetFilters(
      (prev: FiltersParams): FiltersParams => ({
        ...prev,
        [name]:
          name === "zipCodes" || name === "breeds"
            ? value
              ? value.split(",")
              : []
            : ["ageMin", "ageMax", "size"].includes(name)
            ? value
              ? Number(value)
              : 0
            : value,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-sm font-medium text-gray-300">
          Zip Code (leave blank to search all)
        </label>
        <input
          type="text"
          id="location"
          name="zipCodes"
          value={filters.zipCodes.join(",")}
          onChange={handleChange}
          placeholder="Enter zip code"
          className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 bg-gray-700"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="breed" className="text-sm font-medium text-gray-300">
          Breed
        </label>
        <Select
          id="breed"
          name="breeds"
          value={filters.breeds[0] || ""}
          onChange={handleChange}
          className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 bg-gray-700"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Age Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="ageMin"
            name="ageMin"
            value={filters.ageMin}
            onChange={handleChange}
            min="0"
            max="30"
            placeholder="Min"
            className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 bg-gray-700 w-full"
          />
          <input
            type="number"
            id="ageMax"
            name="ageMax"
            value={filters.ageMax}
            onChange={handleChange}
            min="0"
            max="30"
            placeholder="Max"
            className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 bg-gray-700 w-full"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        onClick={onSubmit}
        className="py-2 px-4 font-semibold"
      >
        Apply
      </Button>
    </form>
  );
};

export default SidebarFilters;
