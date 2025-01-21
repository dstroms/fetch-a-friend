"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiltersParams } from "../../types/filters.types";
import { Button } from "../button/button";
import Logo from "../logo/logo";
import SidebarFilters from "./sidebar-filters";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type SidebarProps = {
  filters: FiltersParams;
  isSidebarExpanded: boolean;
  onSetFilters: (updater: (prev: FiltersParams) => FiltersParams) => void;
  onApplyFilters: () => void;
  onToggleSidebar: () => void;
};

export default function Sidebar({
  filters,
  isSidebarExpanded,
  onSetFilters,
  onApplyFilters,
  onToggleSidebar,
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    if (isSidebarExpanded && window.innerWidth <= 768) {
      onToggleSidebar();
    }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col gap-4 justify-between p-4">
      <div className="flex flex-col gap-4 text-gray-400">
        <div
          className={`flex gap-2 items-center justify-between ${
            isSidebarExpanded ? "flex-row" : "flex-col sm:flex-row"
          }`}
        >
          <Link
            href="/"
            title="Fetch a Friend Logo"
            aria-label="Fetch a Friend Logo Link to Home"
          >
            <h1 className="text-4xl font-bold flex items-center gap-4">
              <Logo width={50} height={50} />
            </h1>
          </Link>
          <Button
            title={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            className="flex flex-col items-center text-sm"
            onClick={onToggleSidebar}
            variant="secondary"
          >
            {isSidebarExpanded ? (
              <div className="flex flex-col items-center gap-2">
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-xs sm:hidden">Collapse filters</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ArrowRightIcon className="w-5 h-5" />
                <span className="text-xs sm:hidden">Expand filters</span>
              </div>
            )}
          </Button>
        </div>
        <div
          className={`${
            isSidebarExpanded ? "flex" : "hidden sm:flex"
          } flex-col gap-2`}
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Filters
          </h2>
          <SidebarFilters
            filters={filters}
            onSetFilters={onSetFilters}
            onSubmit={handleApplyFilters}
          />
        </div>
      </div>
      <div className={`${isSidebarExpanded ? "flex" : "hidden sm:flex"}`}>
        <Button variant="secondary" className="text-sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
