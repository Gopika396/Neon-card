import { useState } from "react";

export default function TaskPanel({ agent, partners, onClose, onStart }) {
  const [text, setText] = useState("");
  const [partner, setPartner] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onStart(text.trim(), partner);
    setText("");
    setPartner("");
  };

  return (
    <section className="view view-task">
      <div className="vhead">
        <b>Assign task to {agent.name}</b>
        <button className="x" onClick={onClose} aria-label="Close task form">
          ✕
        </button>
      </div>

      <form onSubmit={submit}>
        <label className="field">
          What should {agent.name} do?
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Audit the login flow"
            autoComplete="off"
          />
        </label>

        <label className="field">
          Team up with
          <select value={partner} onChange={(e) => setPartner(e.target.value)}>
            <option value="">Nobody (work solo)</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.role}
              </option>
            ))}
          </select>
        </label>

        <button className="btn primary block" type="submit">
          Start task
        </button>
      </form>
    </section>
  );
}