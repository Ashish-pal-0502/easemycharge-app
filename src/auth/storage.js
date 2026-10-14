import cache from '../utility/cache';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

const storeTokens = async (accessToken, refreshToken) => {
  if (accessToken) await cache.store(ACCESS_KEY, accessToken);
  if (refreshToken) await cache.store(REFRESH_KEY, refreshToken);
};

const getAccessToken = async () => {
  return await cache.get(ACCESS_KEY);
};

const getRefreshToken = async () => {
  return await cache.get(REFRESH_KEY);
};

const removeTokens = async () => {
  await cache.clear(ACCESS_KEY);
  await cache.clear(REFRESH_KEY);
};

export default {
  storeTokens,
  getAccessToken,
  getRefreshToken,
  removeTokens,
};
