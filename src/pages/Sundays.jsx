import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ParentVoteButton from "../components/ParentVoteButton";
import { activities } from "../lib/activities";
import { availableYears, toDateKey, upcomingSundays } from "../lib/sundays";
import { castVote, getMyVotes, retractVote } from "../lib/votes";

export default function Sundays() {
  const { year } = useParams();
  const navigate = useNavigate();

  // No hardcoded year: the route defaults to the current one, and the picker
  // asks the helpers for this year + next, so January rolls over by itself.
  const currentYear = new Date().getFullYear();
  const parsed = Number(year);
  const selectedYear =
    Number.isInteger(parsed) && parsed > 1970 ? parsed : currentYear;

  const upcoming = upcomingSundays(selectedYear);

  // Keep a bookmarked year selectable even if it sits outside the window.
  const baseYears = availableYears();
  const years = baseYears.includes(selectedYear)
    ? baseYears
    : [...baseYears, selectedYear].sort((a, b) => a - b);

  // One load for the whole page: { "2026-01-04|Zoo", ... }
  const [myVotes, setMyVotes] = useState(() => new Set());
  const [pending, setPending] = useState(() => new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getMyVotes()
      .then((votes) => {
        if (active) setMyVotes(votes);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleToggle(dateKey, activity) {
    const key = `${dateKey}|${activity}`;
    if (pending.has(key)) return;

    const wasVoted = myVotes.has(key);

    // Optimistic: flip immediately, roll back if the call fails.
    setMyVotes((prev) => {
      const next = new Set(prev);
      if (wasVoted) next.delete(key);
      else next.add(key);
      return next;
    });
    setPending((prev) => new Set(prev).add(key));
    setError("");

    try {
      if (wasVoted) await retractVote(dateKey, activity);
      else await castVote(dateKey, activity);
    } catch (err) {
      setMyVotes((prev) => {
        const next = new Set(prev);
        if (wasVoted) next.add(key);
        else next.delete(key);
        return next;
      });
      setError(`Could not save your vote. ${err.message}`);
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#1C515A" }}>{selectedYear} Sunday Activities</h1>
      <p>Parents can vote on what they prefer for each Sunday.</p>
      <p style={{ fontSize: "15px" }}>
        <Link to="/votes" style={{ color: "#1C515A" }}>
          See what everyone has picked so far →
        </Link>
      </p>

      <nav
        aria-label="Choose year"
        style={{ margin: "16px 0", display: "flex", gap: "8px" }}
      >
        {years.map((y) => {
          const active = y === selectedYear;
          return (
            <button
              key={y}
              type="button"
              onClick={() => navigate(`/sundays/${y}`)}
              aria-current={active ? "page" : undefined}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                font: "inherit",
                fontSize: "15px",
                cursor: "pointer",
                border: active ? "1px solid #1C515A" : "1px solid #bbb",
                background: active ? "#1C515A" : "transparent",
                color: active ? "#fff" : "inherit",
              }}
            >
              {y}
            </button>
          );
        })}
      </nav>

      {error && (
        <p role="alert" style={{ color: "#a33", fontSize: "15px" }}>
          {error}
        </p>
      )}

      {upcoming.length === 0 && (
        <p>
          No upcoming Sundays left in {selectedYear}.{" "}
          <Link to={`/sundays/${selectedYear + 1}`} style={{ color: "#1C515A" }}>
            Look ahead to {selectedYear + 1} →
          </Link>
        </p>
      )}

      {upcoming.map((date) => {
        const dateKey = toDateKey(date);

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
              {activities.map(({ name, url }) => {
                const key = `${dateKey}|${name}`;

                return (
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

                    <ParentVoteButton
                      voted={myVotes.has(key)}
                      disabled={pending.has(key)}
                      onToggle={() => handleToggle(dateKey, name)}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
