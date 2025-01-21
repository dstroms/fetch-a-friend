"use client";
import { Button } from "@components/app/components/button/button";

type PaginationProps = {
  pageSize: number;
  currentPage: number;
  totalDogs: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  pageSize,
  currentPage,
  totalDogs,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalDogs / pageSize);

  return (
    <div className="flex justify-between items-center p-2 sm:p-4 text-sm text-gray-400 bg-gray-900">
      <div className="flex items-center gap-2">
        {(currentPage - 1) * pageSize + 1}-
        {Math.min(currentPage * pageSize, totalDogs)} of {totalDogs} dogs
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="disabled:bg-gray-700 disabled:text-gray-500"
          >
            First
          </Button>
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="disabled:bg-gray-700 disabled:text-gray-500"
          >
            Previous
          </Button>
        </div>
        <div className="hidden sm:block">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="disabled:bg-gray-700 disabled:text-gray-500"
          >
            Next
          </Button>
          <Button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="disabled:bg-gray-700 disabled:text-gray-500"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
