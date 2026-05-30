"use client";
import React, { useState, useRef, useCallback } from "react";

const BLINK = `@keyframes termBlink { 0%,100%{opacity:1} 50%{opacity:0} }`;

const GREEN = "#5AF78E";
const WHITE = "rgba(255,255,255,0.9)";
const DIM   = "rgba(255,255,255,0.4)";

type Message = { role: "user" | "bot"; text: string; done?: boolean };

const PROMPTS = [
  "What do you design?",
  "What are you working on?",
  "Where are you based?",
  "How can I reach you?",
];

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (/design|designer|what do you do/.test(q))
    return "I'm a product designer focused on the intersection of AI and workflow tools. I care a lot about how software feels to use - not just how it looks.";
  if (/working on|project|datalign|current/.test(q))
    return "Right now I'm designing at Datalign, building conversational data analysis tools that replace traditional BI dashboards. Small team - I own end-to-end design.";
  if (/based|location|where|city|boston/.test(q))
    return "I'm based in Boston, studying at Northeastern University. Graduating April 2026.";
  if (/contact|email|reach|hire|talk/.test(q))
    return "Best way is email - martta.xu@outlook.com. I'm also on LinkedIn and read every message.";
  if (/school|study|northeastern|nu|education/.test(q))
    return "I study at Northeastern University - combined major in Design and Computer Science. Graduating April 2026.";
  if (/tool|figma|software|stack|code/.test(q))
    return "Figma for everything visual. Framer and Next.js when I need to prototype in the browser. I write just enough code to know what's buildable.";
  return "Good question - but I didn't pre-program that one. Try martta.xu@outlook.com if you're genuinely curious.";
}

const mono: React.CSSProperties = {
  fontFamily: "'SF Mono', Menlo, 'Cascadia Code', Consolas, 'Courier New', monospace",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "1.6",
  letterSpacing: "-0.01em",
  color: WHITE,
};

const Cursor = () => (
  <span style={{
    display: "inline-block",
    width: "9px",
    height: "15px",
    background: WHITE,
    verticalAlign: "text-bottom",
    marginLeft: "1px",
    flexShrink: 0,
    animation: "termBlink 1s step-end infinite",
  }} />
);

const Prompt = () => (
  <>
    <span style={{ color: GREEN }}>martta</span>
    <span style={{ color: WHITE }}>@portfolio ~ % </span>
  </>
);

const PANEL_PAD = 48;

function PromptItem({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...mono,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        width: `calc(100% + ${PANEL_PAD * 2}px)`,
        marginLeft: `-${PANEL_PAD}px`,
        background: hovered ? "rgba(255,255,255,0.08)" : "none",
        border: "none",
        padding: `1px ${PANEL_PAD}px`,
        textAlign: "left",
        cursor: "default",
      }}
    >
      <span style={{ width: "12px", flexShrink: 0, color: GREEN }}>
        {hovered ? "❯" : " "}
      </span>
      {label}
    </button>
  );
}

export default function AskMartta() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [loginTime] = useState(() => {
    const d = new Date();
    return d.toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).replace(",", "");
  });
  const [city, setCity] = useState("ttys003");

  React.useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => { if (d.city) setCity(d.city); })
      .catch(() => {});
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;
      const response = getResponse(text);
      setStarted(true);
      setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: "", done: false }]);
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "bot",
              text: response.slice(0, i),
              done: i >= response.length,
            };
            return next;
          });
          if (i >= response.length) {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, 18);
      }, 150);
    },
    [isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <>
      <style>{BLINK}</style>
      <div style={mono}>

        {/* Last login line */}
        <div style={{ color: DIM, marginBottom: "16px" }}>
          Last login: {loginTime} from {city}
        </div>

        {/* PS1 greeting */}
        <div style={{ marginBottom: "6px" }}>
          <Prompt />
          <span>ask me anything about Martta Xu.</span>
        </div>

        {/* Numbered prompts */}
        {!started && (
          <div style={{ marginBottom: "6px" }}>
            {PROMPTS.map((p, i) => (
              <PromptItem key={p} label={p} onClick={() => sendMessage(p)} />
            ))}
          </div>
        )}

        {/* Conversation history */}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "2px" }}>
            {msg.role === "user" ? (
              <div><Prompt />{msg.text}</div>
            ) : (
              <div>{msg.text}{!msg.done && <Cursor />}</div>
            )}
          </div>
        ))}

        {/* Input line - cursor always visible */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Prompt />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isTyping}
            className="term-input"
            style={{
              ...mono,
              width: `${input.length}ch`,
              minWidth: "1px",
              background: "transparent",
              border: "none",
              outline: "none",
              cursor: "default",
            }}
          />
          {!isFocused && <Cursor />}
        </div>

      </div>
    </>
  );
}
