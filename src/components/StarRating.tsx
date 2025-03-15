
import React from "react";
import { Icons } from "./Icons";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  className = "",
}) => {
  // Convert rating to nearest half-star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const remainder = rating % 1;
  const almostFullStar = remainder > 0.7;

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars + (almostFullStar ? 1 : 0))].map((_, i) => (
        <Icons.star
          key={`full-${i}`}
          className="text-yellow-400 fill-yellow-400"
          width={size}
          height={size}
        />
      ))}
      {hasHalfStar && (
        <Icons.halfStar
          className="text-yellow-400 fill-yellow-400"
          width={size}
          height={size}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Icons.emptyStar
          key={`empty-${i}`}
          className="text-gray-300 dark:text-gray-600"
          width={size}
          height={size}
        />
      ))}
    </div>
  );
};
