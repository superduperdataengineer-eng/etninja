"use client";
import React from "react";

export default function VideoPlayer({ url, width = 640, height = 360 }) {
  // Convert YouTube URLs to embed format
  const convertToEmbed = (u) => {
    if (u.includes("youtu.be/")) {
      const id = u.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}?controls=1&autoplay=0`;
    }
    const idMatch = u.match(/v=([^&]+)/);
    if (idMatch) {
      const id = idMatch[1];
      return `https://www.youtube.com/embed/${id}?controls=1&autoplay=0`;
    }
    return u;
  };

  const embedUrl = convertToEmbed(url);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
