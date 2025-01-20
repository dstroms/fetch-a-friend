"use client";
import { useEffect, useState } from "react";
import { FiltersParams } from "@components/app/types/filters.types";
import { Select } from "@headlessui/react";
import { Button } from "@components/app/components/button";

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
        <label htmlFor="location" className="text-sm font-medium">
          Zip Code (leave blank to search all)
        </label>
        <input
          type="text"
          id="location"
          name="zipCodes"
          value={filters.zipCodes.join(",")}
          onChange={handleChange}
          placeholder="Enter zip code"
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 px-3 py-2 bg-gray-700 text-gray-400"
        />
      </div>

      {/* Breed Dropdown */}
      <div className="flex flex-col gap-1">
        <label htmlFor="breed" className="text-sm font-medium">
          Breed
        </label>
        <Select
          id="breed"
          name="breeds"
          value={filters.breeds[0] || ""}
          onChange={handleChange}
          className="py-2.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 bg-gray-700 text-gray-400"
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
        <label className="text-sm font-medium">Age Range</label>
        <div className="flex gap-2 w-auto">
          <input
            type="number"
            id="ageMin"
            name="ageMin"
            value={filters.ageMin}
            onChange={handleChange}
            min="0"
            placeholder="Min"
            className="border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 px-3 py-2 bg-gray-700 text-gray-400 w-full"
          />
          <input
            type="number"
            id="ageMax"
            name="ageMax"
            value={filters.ageMax}
            onChange={handleChange}
            min="0"
            placeholder="Max"
            className="border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 px-3 py-2 bg-gray-700 text-gray-400 w-full"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        onClick={onSubmit}
        className="py-2 px-4"
      >
        Apply
      </Button>
    </form>
  );
};

export default SidebarFilters;
