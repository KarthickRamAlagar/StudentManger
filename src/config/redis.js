import { createClient } from "redis";
import dotenv from "dotenv";

// Env Instance
dotenv.config();
// console.log("REDIS_URL =", process.env.REDIS_URL);

// client Instance
const redisClient = createClient({
  url: process.env.REDIS_URL,

  socket: {
    reconnectStrategy: (retries) => {
      console.log(`[Redis] Reconnect Attempt ${retries}`);
      return 5000;
    },
  },
});

// Connection Event
redisClient.on("connect", () => {
  console.log("[Redis] Connecting...");
});

//  Event:Ready
redisClient.on("ready", () => {
  console.log("[Redis] Connected and Ready");
});

// Event: error
redisClient.on("error", (err) => {
  console.error("[Redis] Error:", err);
});

// Event: end
redisClient.on("end", () => {
  console.log("[Redis] Connection closed");
});

export default redisClient;
