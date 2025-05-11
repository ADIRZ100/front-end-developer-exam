import React from "react";
import { Track } from "./types";

interface Props {
  selectedTrack: Track | null;
  onClose: () => void;
}

const ImageContainer: React.FC<Props> = ({ selectedTrack, onClose }) => {
  if (!selectedTrack) return null;

  const embedUrl = `https://www.mixcloud.com/widget/iframe/?feed=${selectedTrack.url}&hide_cover=1&light=1`;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <img
          src={selectedTrack.pictures?.large || ""}
          alt={selectedTrack.name}
          className="modal-image"
        />
        <iframe
          title="player"
          width="100%"
          height="120"
          src={embedUrl}
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};

export default ImageContainer;
