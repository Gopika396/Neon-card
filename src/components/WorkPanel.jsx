export default function WorkPanel({ work, progress }) {
  const pct = Math.round(progress);

  return (
    <section className="view view-work">
      <p className="work-title">{work ? work.title : "Idle"}</p>
      <p className="work-sub">{work ? work.sub : ""}</p>
      <div className="meter">
        <i />
      </div>
      <p className="pct">{pct >= 100 ? "Done ✓" : `${pct}%`}</p>
    </section>
  );
}