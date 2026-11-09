import { useCallback, useEffect, useRef, useState } from "react";
import { AGENTS } from "./data/agents";
import Background from "./components/Background";
import Header from "./components/Header";
import AgentCard from "./components/AgentCard";
import LinkLine from "./components/LinkLine";
import Toast from "./components/Toast";

const BY_ID = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

export default function App() {
  const [openIds, setOpenIds] = useState([]);
  const [views, setViews] = useState({});
  const [following, setFollowing] = useState({});
  const [job, setJob] = useState(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);
  const [completed, setCompleted] = useState(0);

  const hovered = useRef(null);
  const toastTimer = useRef(null);

  const viewOf = (id) => views[id] || "profile";

  const notify = useCallback((content) => {
    clearTimeout(toastTimer.current);
    setToast({ content, show: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => (t ? { ...t, show: false } : t));
    }, 2400);
  }, []);

  // A card in chat / task mode keeps focus until it is closed.
  const lockedId = AGENTS.find(
    (a) => openIds.includes(a.id) && viewOf(a.id) !== "profile"
  )?.id;

  const handleEnter = (id) => {
    hovered.current = id;
    if (job) return;
    if (lockedId && lockedId !== id) return;
    setOpenIds([id]);
  };

  const handleLeave = (id) => {
    if (hovered.current === id) hovered.current = null;
    if (job) return;
    if (viewOf(id) === "profile") {
      setOpenIds((ids) => ids.filter((x) => x !== id));
    }
  };

  const setView = (id, view) => setViews((v) => ({ ...v, [id]: view }));

  const closePanel = (id) => {
    setView(id, "profile");
    if (hovered.current !== id) {
      setOpenIds((ids) => ids.filter((x) => x !== id));
    }
  };

  const handleFollow = (id) => {
    const now = !following[id];
    setFollowing((f) => ({ ...f, [id]: now }));
    notify(
      now ? (
        <>
          You are now following <b>{BY_ID[id].name}</b>!
        </>
      ) : (
        <>
          Unfollowed <b>{BY_ID[id].name}</b>
        </>
      )
    );
  };

  const handleMessageSent = (id) => {
    notify(
      <>
        Message sent to <b>{BY_ID[id].name}</b>!
      </>
    );
  };

  const handleStartTask = (id, text, partnerId) => {
    const ids = partnerId ? [id, partnerId] : [id];
    setViews((v) => {
      const next = { ...v };
      ids.forEach((i) => (next[i] = "work"));
      return next;
    });
    setOpenIds(ids);
    setProgress(0);
    setJob({ leader: id, partner: partnerId || null, text: text || "Untitled task" });
  };

  // Fill the progress bar while a job is running.
  useEffect(() => {
    if (!job) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2 + Math.random() * 4));
    }, 120);
    return () => clearInterval(timer);
  }, [job]);

  // When the bar is full, announce it and put the cards back.
  useEffect(() => {
    if (!job || progress < 100) return;
    const ids = [job.leader, job.partner].filter(Boolean);
    const names = ids.map((i) => BY_ID[i].name).join(" & ");

    notify(
      <>
        <b>{names}</b> finished: {job.text}
      </>
    );

    const timer = setTimeout(() => {
      setViews((v) => {
        const next = { ...v };
        ids.forEach((i) => (next[i] = "profile"));
        return next;
      });
      setOpenIds((list) => list.filter((x) => x === hovered.current));
      setJob(null);
      setProgress(0);
      setCompleted((c) => c + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [progress, job, notify]);

  const linkedIds = job && job.partner ? [job.leader, job.partner] : [];
  const jobIds = job ? [job.leader, job.partner].filter(Boolean) : [];
  const anyActive = openIds.length > 0 || linkedIds.length > 0;

  const workFor = (id) => {
    if (!job || !jobIds.includes(id)) return null;
    if (id === job.leader) {
      return {
        title: job.text,
        sub: job.partner
          ? `Teaming up with ${BY_ID[job.partner].name}`
          : "Working solo",
      };
    }
    return {
      title: `Helping ${BY_ID[job.leader].name}`,
      sub: job.text,
    };
  };

  return (
    <div className="app">
      <Background />
      <Header total={AGENTS.length} completed={completed} />

      <main className="stage">
        {AGENTS.map((agent) => {
          const open = openIds.includes(agent.id);
          const linked = linkedIds.includes(agent.id);

          return (
            <AgentCard
              key={agent.id}
              agent={agent}
              partners={AGENTS.filter((a) => a.id !== agent.id)}
              open={open}
              view={viewOf(agent.id)}
              dimmed={anyActive && !open && !linked}
              linked={linked}
              busy={jobIds.includes(agent.id)}
              following={!!following[agent.id]}
              followers={agent.stats.followers + (following[agent.id] ? 1 : 0)}
              progress={progress}
              work={workFor(agent.id)}
              onEnter={handleEnter}
              onLeave={handleLeave}
              onSetView={setView}
              onClosePanel={closePanel}
              onFollow={handleFollow}
              onMessageSent={handleMessageSent}
              onStartTask={handleStartTask}
            />
          );
        })}

        <LinkLine ids={linkedIds.length === 2 ? linkedIds : null} />
      </main>

      <Toast toast={toast} />
    </div>
  );
}