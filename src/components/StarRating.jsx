import React from 'react';
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Determine if there's a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining stars are empty

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <div key={`full-${index}`} className="star">
          <Star className="w-4 h-4 text-sunburst fill-sunburst" />
        </div>
      ))}
      {hasHalfStar && (
        <div className="star" style={{ '--star-width': '50%' }}> {/* Using a custom property to set half width */}
          <Star className="w-4 h-4 text-sunburst fill-sunburst" style={{ width: '50%' }} /> {/* Use CSS for half filling */}
        </div>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <div key={`empty-${index}`} className="star">
          <Star className="w-4 h-4 text-sunburst" />
        </div>
      ))}
    </div>
  );
};

export default StarRating;