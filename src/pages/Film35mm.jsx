import React from "react";
import Tealline from "./Tealline";

function FilmGrid({ folder, images }) {
  return (
    <>
      <p
        style={{
          maxWidth: "700px",
          margin: "40px auto 20px",
          lineHeight: "1.6",
          fontSize: "1.1rem"
        }}
      >
        This page utilizes React to create a responsive grid layout for displaying images. I created it
        using mostly Dreamweaver and uploaded it onto GitHub. While it may appear minimalist, the point
        is proof of concept for a fully app‑based personal website. Here are some images taken from
        2012&ndash;2014 in Beijing and Wuhan.
      </p>

      <Tealline />

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
            src={name.startsWith("http") ? name : `/lewis_page/${folder}/${name}`}
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
    </>
  );
}

export default function Film35mm() {
  const images = [
    "000011-1.jpg",
    "000014.BMP",
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
    "lomopic.jpg"
  ];

  return <FilmGrid folder="35mmfilm" images={images} />;
}
