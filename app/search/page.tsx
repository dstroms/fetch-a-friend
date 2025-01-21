"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import AvailableDogs from "./components/available-dogs";
import { FiltersParams } from "../types/filters.types";
import { SortByBar } from "./components/sort-by-bar";
import { Dog } from "../types/dog.types";
import Pagination from "./components/pagination";
import Modal from "../components/modal/modal";
import { DogCard } from "./components/dog-card";
import { ModalContent } from "../types/modal.types";
import { Button } from "../components/button/button";
import BottomBar from "./components/bottom-bar";
import LoadingPage from "./components/loading-error-states/loading-page";
import FetchingDogs from "./components/loading-error-states/fetching-dogs";
import FetchingDogsError from "./components/loading-error-states/fetching-dogs-error";

export default function SearchPage() {
  // page state
  const [dogState, setDogState] = useState<
    "initial" | "fetching" | "success" | "error"
  >("initial");

  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // sidebar state
  const [filters, setFilters] = useState<FiltersParams>({
    zipCodes: [""],
    breeds: [""],
    ageMin: 0,
    ageMax: 20,
    size: 25,
    from: 0,
    sort: "breed:asc",
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // sorting state
  const [sortBy, setSortBy] = useState<string>("breed");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [availableDogIds, setAvailableDogIds] = useState<string[]>([]);

  // favorite dogs state
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  // modal state
  const [modalContent, setModalContent] = useState<ModalContent | null>({
    isOpen: true,
    title: "Welcome!",
    content: (
      <div className="flex flex-col gap-4">
        <div>
          Welcome to <span className="font-semibold">Fetch a Friend!</span> Use
          the filters on the left to search for dogs by breed, zip code, and/or
          age. Click on your favorite dogs to add them to your favorites, which
          will show up at the bottom of the page. When you&apos;re ready, click
          &quot;Match me!&quot; to find your match!
        </div>
        <div>
          You can clear your favorites by clicking on &quot;Clear
          favorites.&quot;
        </div>
        <Button onClick={() => setModalContent(null)}>Ok!</Button>
      </div>
    ),
  });

  const handleSearchDogs = async () => {
    setDogState("fetching");
    try {
      const queryParams = new URLSearchParams({
        size: "25",
        from: ((currentPage - 1) * 25).toString(),
        sort: `${sortBy}:${sortDirection}`,
      });

      // Add filters only if they have values
      const { zipCodes, breeds, ageMin, ageMax } = filters;

      const validZips = zipCodes.filter(Boolean);
      const validBreeds = breeds.filter(Boolean);

      if (validZips.length) queryParams.set("zipCodes", validZips.join(","));
      if (validBreeds.length) queryParams.set("breeds", validBreeds.join(","));
      if (ageMin > 0) queryParams.set("ageMin", ageMin.toString());
      if (ageMax < 100) queryParams.set("ageMax", ageMax.toString());

      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: "SameSite=None; Secure",
          },
        }
      );

      if (response.status === 401) {
        // assume the cookie is expired, redirect user to login
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch dogs: ${response.status}`);
      }

      const data = await response.json();
      setAvailableDogIds(data.resultIds || []);
      setTotalDogs(data.total || 0);
      setDogState("success");
      setIsInitialLoadComplete(true);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setIsInitialLoadComplete(true);
    }
  };

  const handleMatchMe = async () => {
    try {
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/match`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favoriteDogs.map((dog) => dog.id)),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to match dogs: ${response.status}`);
      }
      const data = await response.json();
      const matchedDog = favoriteDogs.find((dog) => dog.id === data.match);

      if (!matchedDog) {
        throw new Error("No matches found");
      }

      setModalContent({
        isOpen: true,
        title: "Match found!",
        content: (
          <div className="flex flex-col gap-4 w-full">
            <div>
              Congratulations! You matched with{" "}
              <span className="text-lg font-semibold">{matchedDog?.name}</span>!
            </div>
            <DogCard dog={matchedDog} fillContainer={true} />
          </div>
        ),
      });
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  const handleSortBy = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleAddFavorite = (dog: Dog) => {
    if (!favoriteDogs.some((favDog) => favDog.id === dog.id)) {
      setFavoriteDogs([...favoriteDogs, dog]);
    }
  };

  const handleClearFavorites = () => {
    setFavoriteDogs([]);
  };

  useEffect(() => {
    handleSearchDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy, sortDirection]);

  if (!isInitialLoadComplete) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-red-500">
          Error loading dogs. Please try again later.
        </h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="grid grid-cols-12 bg-[#2D445D] h-full overflow-hidden">
          <div
            className={`${
              isSidebarExpanded
                ? "col-span-12 h-screen sm:col-span-3 sm:h-auto"
                : "col-span-2 sm:col-span-2"
            }`}
          >
            <Sidebar
              filters={filters}
              onSetFilters={setFilters}
              onApplyFilters={handleSearchDogs}
              isSidebarExpanded={isSidebarExpanded}
              onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />
          </div>
          <div
            className={`flex flex-col gap-2 h-full overflow-y-auto ${
              isSidebarExpanded ? "col-span-9" : "col-span-10"
            }`}
          >
            <SortByBar
              sortBy={sortBy}
              onSort={handleSortBy}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
            <div className="flex flex-col gap-4 h-full overflow-y-auto">
              {dogState === "error" && (
                <FetchingDogsError error={error || ""} />
              )}
              {dogState === "fetching" && <FetchingDogs />}
              {dogState === "success" && (
                <AvailableDogs
                  availableDogIds={availableDogIds}
                  onAddFavorite={handleAddFavorite}
                />
              )}
            </div>
            <div>
              <Pagination
                pageSize={25}
                currentPage={currentPage}
                totalDogs={totalDogs}
                setCurrentPage={setCurrentPage}
              />
              <BottomBar
                favoriteDogs={favoriteDogs}
                onClearFavorites={handleClearFavorites}
                onMatchMe={handleMatchMe}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
    </>
  );
}
