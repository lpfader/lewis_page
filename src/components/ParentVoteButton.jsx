/**
 * Presentational vote toggle.
 *
 * Deliberately dumb: it does not fetch or mutate anything itself. The parent
 * page loads the whole "my votes" set once and owns the optimistic update,
 * because this component is rendered once per activity per Sunday (hundreds of
 * instances) and individual requests would be an N+1 storm.
 */
export default function ParentVoteButton({ voted, disabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={voted}
      aria-label={voted ? "Remove your vote" : "Vote for this activity"}
      title={voted ? "Remove your vote" : "Vote for this activity"}
      style={{
        marginLeft: "10px",
        minWidth: "78px",
        padding: "4px 10px",
        borderRadius: "6px",
        cursor: disabled ? "wait" : "pointer",
        font: "inherit",
        fontSize: "14px",
        border: voted ? "1px solid #1C515A" : "1px solid #bbb",
        background: voted ? "#1C515A" : "transparent",
        color: voted ? "#fff" : "inherit",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {voted ? "Voted ✓" : "Vote"}
    </button>
  );
}
