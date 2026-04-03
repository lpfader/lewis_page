import ActivityVote from "../components/ActivityVote";

function getSundays2026() {
  const year = 2026;
  const sundays = [];
  const d = new Date(year, 0, 1);

  while (d.getDay() !== 0) {
    d.setDate(d.getDate() + 1);
  }

  while (d.getFullYear() === year) {
    sundays.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }

  return sundays;
}

const activities = [
  "Legoland",
  "Wychwood Theatre",
  "Movie at Woodbine Cinema",
  "Gathering Wild",
  "Zoo",
  "Playground",
  "Make Pizza at Dufferin Grove",
  "Fallsview Waterpark",
  "Oshawa Car Museum",
  "High Park",
  "Sea the Sky (Aquarium & CN Tower)",
  "Whatever Street Festival is Happening",
  "Community Centre Swimming",
  "OHL Game",
  "Chudleighs' Farm",
  "Springridge Farm",
  "Downey's Farm",
  ];

export default function Sundays_2026() {
  const sundays = getSundays2026();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#1C515A" }}>2026 Sunday Activities</h1>
      <p>Click an activity and enter your kid&apos;s initials to vote.</p>
      <p><Link to="/votes_summary">View Votes Summary</Link></p>


      {sundays.map((date) => {
        const dateKey = date.toISOString().split("T")[0];

        return (
          <section
            key={dateKey}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "1rem 0",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem", color: "#1C515A" }}>
              {date.toDateString()}
            </h2>

            {activities.map((activity) => (
              <ActivityVote
                key={activity}
                activity={activity}
                dateKey={dateKey}   // ⭐ THIS IS THE FIX
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}