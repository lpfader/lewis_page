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

"000010.jpg",
"000011-1.jpg",
"000014.BMP",
"000020.jpg",
"000027.JPG",
"000029.jpg",
"000030.BMP",
"000031.JPG",
"000059770022.jpg",
"030303.jpg",
"050505.jpg",
"060606.jpg",
"323232.jpg",
"DSCN2271.JPG",
"hong_kong_from_the_peak.jpg",
"000009-1.jpg",
"000013.jpg",
"lomopic.jpg"];

  return <FilmGrid folder="35mmfilm" images={images} />;
}