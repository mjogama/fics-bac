import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const cacheHost = process.env.CACHE_DB_HOST || "";

export const client = createClient({
  username: process.env.CACHE_DB_NAME || "",
  password: process.env.CACHE_DB_PS || "",
  socket: {
    host: cacheHost,
    port: Number(process.env.CACHE_DB_PORT) || 15874,
  },
});

client.on("error", (err) => console.error("Redis client error:", err));

export const connectCache = async () => {
  if (!cacheHost) {
    throw new Error("Redis host is missing. Set CACHE_DB_HOST.");
  }

  if (client.isOpen) {
    console.log("Redis already connected.");
    return;
  }

  await client.connect();

  const pong = await client.ping();
  if (pong !== "PONG") {
    throw new Error(`Redis ping failed. Expected "PONG", received "${pong}".`);
  }

  console.log(`Redis connected successfully (${cacheHost})`);
};
