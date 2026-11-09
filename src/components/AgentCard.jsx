import { useRef } from "react";
import Avatar from "./Avatar";
import ProfilePanel from "./ProfilePanel";
import ChatPanel from "./ChatPanel";
import TaskPanel from "./TaskPanel";
import WorkPanel from "./WorkPanel";

export default function AgentCard({
  agent,
  partners,
  open,
  view,
  dimmed,
  linked,
  busy,
  following,
  followers,
  progress,
  work,
  onEnter,
  onLeave,
  onSetView,
  onClosePanel,
  onFollow,
  onMessageSent,
  onStartTask,
}) {
  const { id, name, role, a, b, variant } = agent;
  const tiltRef = useRef(null);

  const className = [
    "card",
    open && "open",
    dimmed && "dimmed",
    linked && "linked",
    busy && "busy",
  ]
    .filter(Boolean)
    .join(" ");

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  // Cursor spotlight always follows the mouse; 3D tilt only on the profile view.
  const handleMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (view === "profile" && !busy) {
      el.style.setProperty("--rx", `${(0.5 - y / r.height) * 8}deg`);
      el.style.setProperty("--ry", `${(x / r.width - 0.5) * 10}deg`);
    } else {
      resetTilt();
    }
  };

  const handleLeave = () => {
    resetTilt();
    onLeave(id);
  };

  const tiltClass = ["tilt", open && "is-open", linked && "is-linked"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="slot">
      <div className={tiltClass} ref={tiltRef}>
        <article
          className={className}
          data-view={view}
          style={{ "--a": a, "--b": b, "--p": busy ? progress : 0, "--d": agent.delay }}
          onMouseEnter={() => onEnter(id)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={() => onEnter(id)}
        >
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />

          <div className="avatar-wrap" data-avatar={id}>
            <span className="ring" />
            <div className="avatar">
              <Avatar variant={variant} a={a} b={b} />
            </div>
          </div>

          <h3 className="name">{name}</h3>
          <p className="role">{role}</p>

          <div className="badges">
            <span className="status">
              <i />
              {busy ? "Working" : "Online"}
            </span>
            <span className="lvl">LVL {agent.level}</span>
          </div>

          <div className="panels">
            <div className="panels-inner" onClick={(e) => e.stopPropagation()}>
              <ProfilePanel
                agent={agent}
                following={following}
                followers={followers}
                onFollow={() => onFollow(id)}
                onMessage={() => onSetView(id, "chat")}
                onTask={() => onSetView(id, "task")}
              />
              <ChatPanel
                agent={agent}
                active={view === "chat"}
                onClose={() => onClosePanel(id)}
                onSent={() => onMessageSent(id)}
              />
              <TaskPanel
                agent={agent}
                partners={partners}
                onClose={() => onClosePanel(id)}
                onStart={(text, partnerId) => onStartTask(id, text, partnerId)}
              />
              <WorkPanel work={work} progress={progress} />
            </div>
          </div>

          <div className="edge" />
        </article>
      </div>
    </div>
  );
}