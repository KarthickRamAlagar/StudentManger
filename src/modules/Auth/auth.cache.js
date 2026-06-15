import redisClient from "../../config/redis.js";

const SESSION_PREFIX = "auth:session:";
const DEFAULT_TTL = 2 * 60 * 60; // 7 days

// STORE SESSION (REFRESH TOKEN)

export const setSessionCache = async (
  userId,
  refreshToken,
  ttl = DEFAULT_TTL,
) => {
  const key = `${SESSION_PREFIX}${userId}`;

  await redisClient.setEx(key, ttl, refreshToken);
};

// GET SESSION (REFRESH TOKEN)

export const getSessionCache = async (userId) => {
  const key = `${SESSION_PREFIX}${userId}`;

  const token = await redisClient.get(key);
  return token;
};

// DELETE SESSION (LOGOUT)

export const deleteSessionCache = async (userId) => {
  const key = `${SESSION_PREFIX}${userId}`;

  await redisClient.del(key);
};
