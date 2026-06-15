import redisClient from "../../config/redis.js";

const USER_CACHE_KEY = (id) => `user:${id}`;

// set user cache
export const setUserCache = async (id, data) => {
  await redisClient.setEx(USER_CACHE_KEY(id), 300, JSON.stringify(data));
};

// get user cache
export const getUserCache = async (id) => {
  const data = await redisClient.get(USER_CACHE_KEY(id));
  return data ? JSON.parse(data) : null;
};

// delete cache
export const deleteUserCache = async (id) => {
  await redisClient.del(USER_CACHE_KEY(id));
};

// clear all user list cache (optional)
export const clearUserListCache = async () => {
  const keys = await redisClient.keys("user:*");
  if (keys.length) await redisClient.del(keys);
};
