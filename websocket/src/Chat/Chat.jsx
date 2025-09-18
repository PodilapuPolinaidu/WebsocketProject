import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [message, setmessage] = useState([]);
  const [socket, setsocket] = useState(null);
  const [inputval, setinputval] = useState("");

  useEffect(() => {
    const newSocket = io("https://websocketproject-6p8s.onrender.com");

    setsocket(newSocket);

    newSocket.on("backendmsg", (msg) => {
      setmessage((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, []);

  const sending = () => {
    if (socket && inputval.trim()) {
      socket.emit("frontendmsg", inputval);
      setinputval("");
    }
  };

  return (
    <div>
      <input type="text" onInput={(e) => setinputval(e.target.value)} />
      <button onClick={sending}>Send</button>
      <div id="chatbox">
        {message.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
