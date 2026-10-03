function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mx-auto mb-5 flex w-full max-w-4xl ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 leading-7 ${
          isUser ? "bg-neutral-700 text-white" : "text-neutral-100"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default ChatMessage;
