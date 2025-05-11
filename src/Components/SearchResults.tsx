import React from "react";
import { Track } from "./types";

interface SearchResultsProps {
  results: Track[];
  onSelect: (track: Track) => void;
  viewMode: "list" | "tile";
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect, viewMode }) => {
  return (
    <div className={`search-results ${viewMode}`}>
      {results.map((track) => {
        const img =
          track.pictures?.large || track.pictures?.medium_mobile || track.pictures?.thumbnail;

        return (
          <div key={track.key} className="search-item" onClick={() => onSelect(track)}>
            <img src={img} alt={track.name} />
            <p>{track.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
