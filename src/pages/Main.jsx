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
        View Resume
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
  35mm Film
</a>

      <a
        href="#/120mm"
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
    e.currentTarget.style.transform = "translateY(0)";        }}
      >
        120mm Film
      </a>
<a
  href="#/mpbsdp"
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
Accessibility for MPBSDP on ontario.ca
</a>

<a
  href="#/pshop"
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
Photoshop Projects
</a>

      <div
  style={{
    marginTop: "60px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    opacity: 0.7
  }}
>
  <div
    style={{
      height: "1px",
      backgroundColor: "#ccc",
      marginBottom: "20px"
    }}
  />

  <p
    style={{
      color: "#555",
      fontSize: "15px",
      lineHeight: "1.5",
      margin: 0
    }}
  >
    This site was created by me using React and Visual Basic.
  </p>
</div>
    </div>
    
  );
}
