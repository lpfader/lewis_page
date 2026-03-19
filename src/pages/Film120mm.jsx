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

export default function Film120mm() {
  const images = [

"000001-2.jpg",
"000005.JPG",
"000067.jpg",
"000005111111.JPG",
"000009-1.jpg",
"000011.jpg",
"0000111111.JPG",
"000013-1.jpg",
"000017-1.jpg",
"000019.JPG",
"000051.jpg",
"000053.jpg",
"000069-1.jpg",
"000077.jpg",
"000091-1.jpg"
  ];

  return <FilmGrid folder="120mmfilm" images={images} />;
}