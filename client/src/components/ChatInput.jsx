import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-5 flex w-[calc(100%-30px)] max-w-3xl gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 p-3 shadow-lg"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about company documents..."
        disabled={loading}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;
