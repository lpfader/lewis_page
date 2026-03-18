import React from "react";
import logo from "../assets/Lewis_Fader_logo.png";
console.log("Deploy test:", Date.now());

export default function Main() {
  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <img
        src={logo}
        alt="Lewis Fader"
        style={{ height: "200px" }}
      />

      <a
        href="#/resume"
        style={{
          marginTop: "40px",
          color: "#1C515A",
          fontSize: "20px",
          textDecoration: "none"
        }}
      >
        View Resume →
      </a>

     <a
  href="#/35mm"
  style={{
    marginTop: "20px",
    color: "#1C515A",
    fontSize: "20px",
    textDecoration: "none",
    transition: "color 0.3s ease, transform 0.3s ease"
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.color = "#0E2A30";
    e.currentTarget.style.transform = "translateY(-3px)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.color = "#1C515A";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  35mm Film →
</a>

      <a
        href="#/120mm"
        style={{
          marginTop: "20px",
          color: "#1C515A",
          fontSize: "20px",
          textDecoration: "none"
        }}
      >
        120mm Film →
      </a>
    </div>
  );
}