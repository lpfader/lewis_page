import slide1 from "../assets/MPBSDP/Slide1.JPG";
import slide2 from "../assets/MPBSDP/Slide2.JPG";
import slide3 from "../assets/MPBSDP/Slide3.JPG";
import slide4 from "../assets/MPBSDP/Slide4.JPG";
import slide5 from "../assets/MPBSDP/Slide5.JPG";

export default function MPBSDP() {
  const slides = [slide1, slide2, slide3, slide4, slide5];

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1 style={{ marginBottom: "40px" }}>
        MPBSDP Content Review — October 2024
      </h1> <p style={{ marginBottom: "40px" }}>This represents a review of the MPBSDP content which occurred during October 2024.</p>

      {slides.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          style={{
            width: "100%",
            maxWidth: "900px",
            marginBottom: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        />
      ))}
    </div>
  );
}