export default function Showcase() {
  const projects = [
    {
      name: "This page turns your video into a 3D model. So like here we have the beginnings of the Holodeck! We don't need Gilliweed where were going...",
      url: "https://trace-anything.github.io/"
    },
    {
      name: "Gathering Wild is a neat place to build arts and crafts with your kid.",
      url: "https://gatheringwild.ca/"
    },
    {
      name: "File Converter Pro. Converts files to other formats. I mean I guess it'll work but all my stuff is legit booteg, so if anyone accuses me of anything I can fall back on this, lol.",
      url: "https://hyacinthe-primus.itch.io/file-converter-pro"
    }
  ];

  return (
    <div style={styles.grid}>
      {projects.map((p) => (
        <div key={p.url} style={styles.window}>
          <div style={styles.title}>{p.name}</div>
          <iframe
            src={p.url}
            style={styles.iframe}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  window: {
    border: "2px solid #333",
    borderRadius: "6px",
    overflow: "hidden",
    background: "#fafafa",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  },
  title: {
    background: "#333",
    color: "white",
    padding: "8px",
    fontWeight: "bold",
    fontSize: "14px"
  },
  iframe: {
    width: "100%",
    height: "400px",
    border: "none"
  }
};