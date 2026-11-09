export default function ProfilePanel({
  agent,
  following,
  followers,
  onFollow,
  onMessage,
  onTask,
}) {
  return (
    <section className="view view-profile">
      <div className="stats">
        <div>
          <strong>{agent.stats.tasks}</strong>
          <span>Tasks</span>
        </div>
        <div>
          <strong>{followers.toLocaleString()}</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>{agent.stats.uptime}</strong>
          <span>Uptime</span>
        </div>
      </div>

      <div className="xp">
        <span>XP</span>
        <div className="xp-bar">
          <i style={{ width: `${agent.xp}%` }} />
        </div>
        <em>{agent.xp}%</em>
      </div>

      <div className="skills">
        {agent.skills.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      <div className="row">
        <button
          className={`btn primary${following ? " on" : ""}`}
          onClick={onFollow}
        >
          {following ? "Following ✓" : "Follow"}
        </button>
        <button className="btn light" onClick={onMessage}>
          Message
        </button>
      </div>

      <button className="btn ghost" onClick={onTask}>
        + Assign Task
      </button>
    </section>
  );
}