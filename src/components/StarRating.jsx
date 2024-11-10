import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, className = "" }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - (star - 1)));
        
        return (
          <div key={star} className="relative">
            {/* Empty star base - shown in slate */}
            <Star 
              className="w-5 h-5 text-slate-300" 
            />
            
            {/* Colored star (both outline and fill) with clipping */}
            <div 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star 
                className="w-5 h-5 text-sunburst fill-sunburst"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;