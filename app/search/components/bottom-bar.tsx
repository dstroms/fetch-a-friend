import { Button } from "@components/app/components/button/button";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dog } from "@components/app/types/dog.types";

type BottomBarProps = {
  favoriteDogs: Dog[];
  onClearFavorites: () => void;
  onMatchMe: () => void;
};

export default function BottomBar({
  favoriteDogs,
  onClearFavorites,
  onMatchMe,
}: BottomBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row items-center justify-between p-2 sm:p-4 bg-gray-700">
      <div className="flex items-center gap-2 w-full">
        <div className="font-semibold flex items-center gap-1 text-lg sm:text-3xl">
          <StarIcon className="w-4 h-4 sm:w-6 sm:h-6" /> {favoriteDogs.length}
        </div>

        <div className="flex -space-x-2 overflow-x-hidden">
          {favoriteDogs.map((dog) => (
            // disable Next image optimization due to plan limits
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={dog.id}
              src={dog.img}
              alt={dog.name}
              className="w-10 h-10 rounded-full border-2 border-white"
              width={40}
              height={40}
              title={dog.name}
            />
          ))}
        </div>
        {favoriteDogs.length > 0 && (
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 text-xs"
            onClick={onClearFavorites}
          >
            <TrashIcon className="w-3 h-3" />
            Clear favorites
          </Button>
        )}
      </div>
      <div className="flex w-full sm:justify-end">
        <Button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-3 text-sm sm:text-xl"
          onClick={onMatchMe}
          disabled={favoriteDogs.length < 1}
        >
          Match me! <HeartIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
