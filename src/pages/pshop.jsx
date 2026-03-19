import { useState, useEffect } from "react";

import project1 from "../assets/pshop/mltc-msaa-final-5.png";
import project2 from "../assets/pshop/MLTC-MSAA-layered.png";
import project3 from "../assets/pshop/final-pride-2.png";
import project4 from "../assets/pshop/msaa-mltc-lines-pride-logo.png";
import project5 from "../assets/pshop/pride-final.png";
import project6 from "../assets/pshop/pride-leg-mlts-msaa-june-6.png";

export default function PShop() {
  const images = [project1, project2, project3, project4, project5, project6];

  const [selected, setSelected] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Image Grid */}
      <div
        style={{
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          justifyItems: "center"
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Photoshop project ${i + 1}`}
            style={{
              width: "180px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
            onClick={() => setSelected(src)}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out"
          }}
        >
          <img
            src={selected}
            alt="Enlarged"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              cursor: "default"
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
          />
        </div>
      )}
    </>
  );
}