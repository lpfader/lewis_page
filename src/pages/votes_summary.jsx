export default function VotesSummary() {
  const stored = JSON.parse(localStorage.getItem("parent_votes") || "{}");
  const dates = Object.keys(stored).sort();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "white" }}>Parent Vote Summary</h1>

      {dates.length === 0 && <p>No votes yet.</p>}

      {dates.map((dateKey) => {
        const activities = stored[dateKey];
        const sorted = Object.entries(activities).sort((a, b) => b[1] - a[1]);

        return (
          <section
            key={dateKey}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "1rem 0",
            }}
          >
            <h2 style={{ color: "white" }}>{dateKey}</h2>

            {sorted.map(([activity, count]) => (
              <p key={activity} style={{ color: "white" }}>
                <strong>{activity}</strong>: {count} vote{count !== 1 ? "s" : ""}
              </p>
            ))}
          </section>
        );
      })}
    </div>
  );
}