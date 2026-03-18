import React from "react";

function FilmGrid({ folder, images }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "40px"
      }}
    >
      {images.map((name, i) => (
        <img
          key={i}
          src={
            name.startsWith("http")
              ? name
              : `/lewis_page/${folder}/${name}`
          }
          alt={name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "6px",
            transition: "transform 0.3s ease",
            cursor: "pointer"
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}
    </div>
  );
}

export default function Film35mm() {
  const images = [
    "000014.BMP",
    "000030.BMP"];

  return <FilmGrid folder="35mmfilm" images={images} />;
}