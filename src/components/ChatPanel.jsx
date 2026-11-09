import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";

export default function ChatPanel({ agent, active, onClose, onSent }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! How can I help you?" },
  ]);
  const [text, setText] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, [active]);

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    setMessages((m) => [...m, { from: "me", text: value }]);
    setText("");
    onSent();

    setTimeout(() => {
      const reply = agent.replies[replyIndex.current % agent.replies.length];
      replyIndex.current += 1;
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 900);
  };

  return (
    <section className="view view-chat">
      <div className="vhead">
        <span className="mini">
          <Avatar variant={agent.variant} a={agent.a} b={agent.b} />
        </span>
        <b>{agent.name}</b>
        <button className="x" onClick={onClose} aria-label="Close chat">
          ✕
        </button>
      </div>

      <div className="msgs" ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>

      <form className="line" onSubmit={submit}>
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button className="btn primary sm" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}