"use client";
import { useEffect, useState } from "react";
import { DogCard } from "./dog-card";
import { Dog } from "@components/app/types/dog.types";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface AvailableDogsProps {
  availableDogIds: string[];
  onAddFavorite: (dog: Dog) => void;
}

export default function AvailableDogs({
  availableDogIds,
  onAddFavorite,
}: AvailableDogsProps) {
  const [error, setError] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(availableDogIds),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch breeds: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      setDogs(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  useEffect(() => {
    fetchBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableDogIds]);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-red-500">Error loading breeds</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
      {availableDogIds.length > 0 ? (
        <div className="p-2 sm:p-4 h-full overflow-y-auto">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                onAddFavorite={() => onAddFavorite(dog)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <FaceFrownIcon className="h-6 w-6" />
          <div>No dogs found. Try broadening your search!</div>
        </div>
      )}
    </>
  );
}
