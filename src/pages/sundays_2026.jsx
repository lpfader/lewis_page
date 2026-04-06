import { Link } from "react-router-dom";
import ParentVoteButton from "../components/ParentVoteButton";

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
  { name: "Legoland", url: "https://www.legolanddiscoverycentre.ca/toronto/" },
  { name: "Wychwood Theatre", url: "https://www.wychwoodtheatre.com/" },
  { name: "Movie at Woodbine Cinema", url: "https://www.cineplex.com/Theatre/woodbine-cinemas" },
  { name: "Gathering Wild", url: "https://www.gatheringwild.ca/" },
  { name: "Zoo", url: "https://www.torontozoo.com/" },
  { name: "Playground", url: "https://www.toronto.ca/explore-enjoy/parks-gardens-beaches/" },
  { name: "Make Pizza at Dufferin Grove", url: "https://www.dufferingrovepark.ca/" },
  { name: "Fallsview Waterpark", url: "https://www.fallsviewwaterpark.com/" },
  { name: "Oshawa Car Museum", url: "https://www.canadianautomotivemuseum.com/" },
  { name: "High Park", url: "https://www.highparktoronto.com/" },
  { name: "Sea the Sky (Aquarium & CN Tower)", url: "https://www.ripleyaquariums.com/canada/" },
  { name: "Whatever Street Festival is Happening", url: "https://www.toronto.ca/explore-enjoy/festivals-events/" },
  { name: "Community Centre Swimming", url: "https://www.toronto.ca/explore-enjoy/recreation/swimming/" },
  { name: "OHL Game", url: "https://ontariohockeyleague.com/" },
  { name: "Chudleighs' Farm", url: "https://www.chudleighs.com/" },
  { name: "Springridge Farm", url: "https://springridgefarm.com/" },
  { name: "Downey's Farm", url: "https://downeysfarm.com/" },
  { name: "Metro Convention Centre (for events)", url: "https://www.mtccc.com/" },
  { name: "Toronto Islands", url: "https://www.torontoisland.com/" },
  { name: "Mississauga International Centre (for events)", url: "https://internationalcentre.com/" }
];

export default function Sundays_2026() {
  const sundays = getSundays2026();
  const today = new Date();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#1C515A" }}>2026 Sunday Activities</h1>
      <p>Parents can vote on what they prefer for each Sunday.</p>
      <p><Link to="#/votes_summary">View Votes Summary</Link></p>

      {sundays.map((date) => {
        const dateKey = date.toISOString().split("T")[0];

        if (date < today) return null;

        return (
          <section
            key={dateKey}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "1rem 0",
            }}
          >
            <h2
              style={{
                marginBottom: "0.5rem",
                color: "#1C515A",
                textAlign: "center",
              }}
            >
              {date.toDateString()}
            </h2>

            <div
              style={{
                margin: "0 auto",
                textAlign: "left",
                maxWidth: "400px",
              }}
            >
{activities.map(({ name, url }) => (
  <div
    key={name}
    style={{
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "400px",
    }}
  >
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#1C515A", textDecoration: "none", fontWeight: "bold" }}
    >
      {name}
    </a>

    <ParentVoteButton dateKey={dateKey} activity={name} />
  </div>
))}
            </div>
          </section>
        );
      })}
    </div>
  );
}