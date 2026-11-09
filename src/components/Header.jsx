export default function Header({ total, completed }) {
  return (
    <header className="header">
      <span className="live">
        <i />
        Team online · {total} agents
      </span>

      <h1 data-text="Co-Pilot Team Roster">Co-Pilot Team Roster</h1>

      <p>Hover a card to meet an agent. Message them, or assign a task.</p>

      <div className="counter">
        <b key={completed}>{String(completed).padStart(2, "0")}</b>
        <span>missions completed</span>
      </div>
    </header>
  );
}