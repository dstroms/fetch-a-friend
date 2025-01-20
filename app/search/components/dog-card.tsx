import { Dog } from "@components/app/types/dog.types";
import Image from "next/image";

type DogCardProps = {
  dog: Dog;
  onAddFavorite?: () => void;
  fillContainer?: boolean;
  className?: string;
};

export function DogCard({
  dog,
  onAddFavorite,
  fillContainer,
  className,
}: DogCardProps) {
  return (
    <button
      className={`flex flex-col ${
        fillContainer ? "w-full" : "w-32 sm:w-56"
      } text-left overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-100 bg-gray-200 ${className}`}
      onClick={onAddFavorite}
    >
      <div
        className={`relative ${
          fillContainer ? "h-32 sm:h-72" : "h-24 sm:h-48"
        } w-full`}
      >
        <Image
          src={dog.img}
          alt={dog.name}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col sm:gap-2 p-2 sm:p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{dog.name}</h3>
        <div className="flex flex-col text-xs sm:text-sm text-gray-600 items-start">
          <div>
            Age:{" "}
            {dog.age < 1 ? "A baby! (under 1 year)" : `${dog.age} years old`}
          </div>
          <div className="flex items-center gap-2">Breed: {dog.breed}</div>
          <div className="flex items-center gap-2">
            Location: {dog.zip_code}
          </div>
        </div>
      </div>
    </button>
  );
}
