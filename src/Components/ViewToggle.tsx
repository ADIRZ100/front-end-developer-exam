import React from "react";

interface ViewToggleProps {
  viewMode: "list" | "tile";
  onToggle: (mode: "list" | "tile") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="view-toggle">
      <button onClick={() => onToggle("list")} className={viewMode === "list" ? "active" : ""}>
        List
      </button>
      <button onClick={() => onToggle("tile")} className={viewMode === "tile" ? "active" : ""}>
        Tile
      </button>
    </div>
  );
};

export default ViewToggle;
