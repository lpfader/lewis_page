export default function ParentVoteButton({ dateKey, activity }) {
  function saveVote() {
    const stored = JSON.parse(localStorage.getItem("parent_votes_2026") || "{}");

    if (!stored[dateKey]) stored[dateKey] = {};
    stored[dateKey][activity] = (stored[dateKey][activity] || 0) + 1;

    localStorage.setItem("parent_votes_2026", JSON.stringify(stored));
  }

  return (
    <button
      style={{ marginLeft: "10px" }}
      onClick={saveVote}
    >
      Vote
    </button>
  );
}