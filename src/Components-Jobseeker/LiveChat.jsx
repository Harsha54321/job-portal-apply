import React, { useState, useEffect, useRef } from "react";
import "./LiveChat.css";
import { JHeader } from "./JHeader";
import { Footer } from "../Components-LandingPage/Footer";
import SilverStar from "../assets/SilverStar.png"
import GoldStar from "../assets/GoldStar.png"
import SendIcon from "../assets/SendIcon.png"


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
  const chatBodyRef = useRef(null);
  const [step, setStep] = useState("INIT");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, step]);


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
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = () => {
    setShowFeedback(false);
    setStep("ENDED");
  };

  return (
    <div>
      <JHeader />

      <div className="chat-wrapper">
        <div className="chat-box">
          {step === "INIT" && (
            <div className="start-card">
              <p>Tell us what's going on</p>
              <button onClick={startConversation}>
                Start conversation <img className="send-icon" src={SendIcon} alt="SendTo" />
              </button>
            </div>

          )}

          {step !== "INIT" && (
            <>
              <div className="chat-body" ref={chatBodyRef}>
                <div className="chat-spacer" />

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-msg ${msg.from === "user" ? "user" : "bot"}`}
                  >
                    <span>{msg.text}</span>
                  </div>
                ))}

                {isTyping && <TypingDots />}

                {step === "ENDED" && (
                  <div className="chat-complete">
                    <p>Bot has ended your conversation</p>
                  </div>
                )}
                <div ref={chatBodyRef} />
              </div>

              {step === "CHAT" && (
                <div className="chat-input">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                  />
                  <button onClick={handleSend}>
                    Send <img className="send-icon" src={SendIcon} />
                  </button>
                  <button className="end-btn" onClick={endConversation}>
                    End
                  </button>
                </div>
              )}

              {step === "ENDED" && (
                <div className="chat-end-bar">
                  <button onClick={startConversation}>
                    Start new conversation
                    <img className="send-icon" src={SendIcon} />
                  </button>
                </div>
              )}
            </>
          )}




        </div>

        {showFeedback && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Share your feedback</h3>

              <div className="stars">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className="star"
                    onClick={() => setRating(num)}
                  >
                    <img
                      src={rating >= num ? GoldStar : SilverStar}
                      alt="star"
                    />
                  </span>
                ))}
              </div>


              <textarea
                placeholder="Your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button onClick={handleFeedbackSubmit}>
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
