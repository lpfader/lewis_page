import { useState } from "react";

function ActivityVote({ activity, dateKey }) {
  const [initials, setInitials] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = initials.trim();
    setSubmitted(trimmed);
    setInitials("");

    // Load existing votes
    const stored = JSON.parse(localStorage.getItem("votes_2026") || "{}");

    // Ensure date + activity structure exists
    if (!stored[dateKey]) stored[dateKey] = {};
    stored[dateKey][activity] = trimmed;

    // Save back to localStorage
    localStorage.setItem("votes_2026", JSON.stringify(stored));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>{activity}</strong>

      {submitted && (
        <span style={{ marginLeft: "10px", color: "#1C515A" }}>
          — {submitted}
        </span>
      )}

      {!submitted && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "inline-block", marginLeft: "10px" }}
        >
          <input
            type="text"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            placeholder="Initials"
            style={{ width: "60px", marginRight: "5px" }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ActivityVote;