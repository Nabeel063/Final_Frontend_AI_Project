// socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
const socket = io(SOCKET_URL, {
  path: "/socket.io",
// const socket = io("https://recruterai.in", { // https://exam-backend-11.onrender.com or path nhi rahega // https://103.192.198.240
//   path:"/socket.io",
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1500,
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("🔗 Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.warn("⚠️ Socket disconnected. Will retry...");
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});

const queue = [];

export function emitViolation(params) {
  const payload = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  console.log("📤 Queued violation:", payload);
  queue.push(payload);
  flushQueue();
}

function flushQueue() {
  if (!socket.connected) {
    console.warn("⛔ Cannot flush, socket offline.");
    setTimeout(flushQueue, 1500);
    return;
  }

  while (queue.length > 0) {
    const event = queue.shift();
    console.log("🚀 Sending violation:", event);
    socket.emit("suspicious_event", event);
  }
}

export default socket;
