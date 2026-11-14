import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSummary } from "../lib/votes";

function formatDate(dateKey) {
  // dateKey is "2026-01-04"; keep it in local terms to avoid off-by-one drift.
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toDateString();
}

export default function VotesSummary() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getSummary()
      .then((data) => {
        if (!active) return;
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Group flattened rows back into one block per Sunday, already ranked.
  const byDate = new Map();
  for (const row of rows) {
    if (!byDate.has(row.sunday_date)) byDate.set(row.sunday_date, []);
    byDate.get(row.sunday_date).push(row);
  }
  const dates = [...byDate.keys()].sort();
  const totalVotes = rows.reduce((sum, r) => sum + Number(r.votes), 0);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#1C515A" }}>Where Parents Want to Go</h1>
      <p style={{ fontSize: "15px" }}>
        <Link to="/sundays" style={{ color: "#1C515A" }}>
          ← Back to voting
        </Link>
      </p>

      {loading && <p>Loading results…</p>}

      {error && (
        <p role="alert" style={{ color: "#a33" }}>
          Could not load results. {error}
        </p>
      )}

      {!loading && !error && dates.length === 0 && (
        <p>No votes yet — be the first to pick something.</p>
      )}

      {!loading && !error && dates.length > 0 && (
        <>
          <p style={{ fontSize: "15px", opacity: 0.75 }}>
            {totalVotes} vote{totalVotes === 1 ? "" : "s"} across {dates.length}{" "}
            Sunday{dates.length === 1 ? "" : "s"}.
          </p>

          {dates.map((dateKey) => {
            const entries = byDate.get(dateKey);
            const top = Math.max(...entries.map((e) => Number(e.votes)), 1);
            const dayTotal = entries.reduce((s, e) => s + Number(e.votes), 0);

            return (
              <section
                key={dateKey}
                style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}
              >
                <h2 style={{ color: "#1C515A", fontSize: "18px" }}>
                  {formatDate(dateKey)}
                </h2>

                {entries.map((entry) => {
                  const votes = Number(entry.votes);
                  const pct = Math.round((votes / top) * 100);
                  return (
                    <div key={entry.activity} style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "15px",
                        }}
                      >
                        <span>{entry.activity}</span>
                        <strong>{votes}</strong>
                      </div>
                      <div
                        style={{
                          height: "6px",
                          borderRadius: "3px",
                          background: "#e6e6e6",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: "#1C515A",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                <p style={{ fontSize: "13px", opacity: 0.7, marginTop: "8px" }}>
                  {dayTotal} vote{dayTotal === 1 ? "" : "s"} this Sunday
                </p>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
