import React from "react";

export default function SkillsTable() {
  return (
    <div
      style={{
        marginTop: "60px",
        width: "100%",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Skills</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "16px",
          lineHeight: "1.5"
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Content Management Systems (AEM 6.2–6.5, Joomla, WEM, Sitecore, Drupal), WalkMe, 24.7 Kasisto
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              HTML5, CSS, JavaScript (JSON & Spyder JS Framework), React, Vue
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Microsoft Office Suite
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Adobe Analytics & GA4
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              MS Access
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Sketch, Photoshop, InDesign, Acoustic, Dreamweaver & Adobe Suite
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              jQuery, Axure Wireframes, Figma
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Jira
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Confluence
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Agile, FTP Suites, SharePoint
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px", borderBottom: "1px solid #ddd" }}>
              Linux/Unix Terminal, Python & Python Libraries, SQL, C#/.NET, Object‑Oriented Programming
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 15px" }}>
              AODA (WCAG AA) & SEO Best Practices
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}