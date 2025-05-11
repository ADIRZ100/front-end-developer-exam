import React from "react";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect }) => {
  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>
      <ul>
        {searches.map((q, i) => (
          <li key={i} onClick={() => onSelect(q)}>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
