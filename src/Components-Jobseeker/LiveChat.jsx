import React, { useState, useEffect, useRef } from "react";
import "./LiveChat.css";
import { JHeader } from "./JHeader";
import { Footer } from "../Components-LandingPage/Footer";


const TypingDots = () => {
  return (
    <div className="chat-msg bot typing">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

const LiveChat = () => {
  const [step, setStep] = useState("INIT"); // INIT | CHAT | ENDED
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const startConversation = () => {
    setStep("CHAT");
    setMessages([
      {
        from: "bot",
        text: "Hi, How can I help you..."
      }
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg = {
      from: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    simulateBotReply(input);
  };

  const simulateBotReply = (userText) => {
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        "Please tell me more so I can assist you better.";

      if (userText.toLowerCase().includes("login")) {
        reply =
          "You can login as a jobseeker by clicking Login → Jobseeker and using your registered email and password.";
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: reply }
      ]);
    }, 1500);
  };

  const endConversation = () => {
    setStep("ENDED");
    setShowFeedback(true);
  };

  return (
    <div>
      <JHeader />

      <div className="chat-wrapper">
        <div className="chat-box">

          {/* INIT STATE */}
          {step === "INIT" && (
            <div className="start-card">
              <p>Tell us what's going on</p>
              <button onClick={startConversation}>
                Start conversation
              </button>
            </div>

          )}

          {/* CHAT STATE */}
          {step === "CHAT" && (
            <>
              <div className="chat-body">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-msg ${msg.from === "user" ? "user" : "bot"
                      }`}
                  >
                    <span>{msg.text}</span>
                  </div>
                ))}

                {isTyping && <TypingDots />}

                <div ref={chatEndRef} />
              </div>

              <div className="chat-input">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isTyping}
                />
                <button onClick={handleSend}>Send</button>
                <button
                  className="end-btn"
                  onClick={endConversation}
                >
                  End
                </button>
              </div>
            </>
          )}

          {/* ENDED STATE */}
          {step === "ENDED" && (
            <div className="end-screen">
              <p>Bot has ended your conversation</p>
              <button onClick={startConversation}>
                Start new conversation
              </button>
            </div>
          )}
        </div>

        {/* FEEDBACK MODAL */}
        {showFeedback && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Share your feedback</h3>

              <div className="stars">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={rating >= num ? "active" : ""}
                    onClick={() => setRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button onClick={() => setShowFeedback(false)}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LiveChat;
