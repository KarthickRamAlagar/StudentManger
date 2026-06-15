import redisClient from "../../config/redis.js";

const PREFIX = "students:";

// SET CACHE
export const setStudentsCache = async (key, data, ttl = 300) => {
  await redisClient.setEx(PREFIX + key, ttl, JSON.stringify(data));
};

// GET CACHE
export const getStudentsCache = async (key) => {
  const data = await redisClient.get(PREFIX + key);
  return data ? JSON.parse(data) : null;
};

// CLEAR ALL CACHE (on update/delete)
export const clearStudentsCache = async () => {
  const keys = await redisClient.keys(`${PREFIX}*`);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};
