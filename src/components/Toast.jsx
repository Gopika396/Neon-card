export default function Toast({ toast }) {
  return (
    <div className={`toast${toast && toast.show ? " show" : ""}`} role="status">
      {toast ? toast.content : null}
    </div>
  );
}