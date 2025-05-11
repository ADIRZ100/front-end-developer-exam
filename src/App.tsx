import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import SearchResults from "./Components/SearchResults";
import ImageContainer from "./Components/ImageContainer";
import RecentSearches from "./Components/RecentSearches";
import ViewToggle from "./Components/ViewToggle";
import { Track } from "./Components/types";
import { searchTracks } from "./Services/api";

const App: React.FC = () => {
  const [results, setResults] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"list" | "tile">("list");

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    const savedView = localStorage.getItem("viewMode");
    const savedQuery = localStorage.getItem("query");
    const savedOffset = localStorage.getItem("offset");
    const savedTrack = localStorage.getItem("selectedTrack");

    if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
    if (savedView === "tile") setViewMode("tile");

    if (savedQuery) {
      setQuery(savedQuery);
      const offsetNum = savedOffset ? Number(savedOffset) : 0;
      setOffset(offsetNum);

      searchTracks(savedQuery, offsetNum).then((data) => {
        setResults(data);
      });
    }

    if (savedTrack) {
      setSelectedTrack(JSON.parse(savedTrack));
    }
  }, []);

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("query", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("offset", offset.toString());
  }, [offset]);

  useEffect(() => {
    if (selectedTrack) {
      localStorage.setItem("selectedTrack", JSON.stringify(selectedTrack));
    }
  }, [selectedTrack]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    setOffset(0);
    const data = await searchTracks(q);
    setResults(data);
    updateRecentSearches(q); 
  };


  const handleNext = async () => {
    const newOffset = offset + 6;
    const data = await searchTracks(query, newOffset);
    setResults(data);
    setOffset(newOffset);
  };


  const updateRecentSearches = (q: string) => {
    const newList = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(newList); 
  };

  return (
    <div>
          <header className="app-header">
            <h1>Welcome to Music Search</h1>
            <p>Discover new tracks, artists, and explore the world of music</p>
         </header>

        <div className="app">
        <SearchBar onSearch={handleSearch} />
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        <SearchResults
          results={results}
          onSelect={setSelectedTrack}
          viewMode={viewMode}
        />
        <button onClick={handleNext}>Next</button>
        <ImageContainer
          selectedTrack={selectedTrack}
          onClose={() => setSelectedTrack(null)}
        />
        <RecentSearches searches={recentSearches} onSelect={handleSearch} />
      </div>
    </div>
    
  );
};

export default App;
