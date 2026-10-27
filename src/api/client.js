import { create } from 'apisauce';
import authStorage from '../auth/storage';
import cache from '../utility/cache';
import { userSetter } from '../auth/context';
import { Toast } from 'toastify-react-native';

const apiClient = create({
  // baseURL: 'https://backend.doera.ai/api',
  // baseURL: 'http://192.168.31.106:5000/api', //local backend
  baseURL: 'http://10.70.253.1:5000/api', // testing url
  headers: { Accept: 'application/vnd.github.v3+json' },
});

apiClient.addAsyncRequestTransform(async request => {
  const token = await authStorage.getAccessToken();
  if (!token) return;

  // request.headers['x-auth-token'] = token;
   request.headers['Authorization'] = `Bearer ${token}`;
});

/* Refresh token interceptor */
apiClient.axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (originalRequest.url === '/user/refresh-tokens') {
      return Promise.reject(error);
    }

    //  Handle 403 - no token / user not logged in
    if (error.response?.status === 403) {
      await authStorage.removeTokens();
      await cache.clear('userDetails');
      Toast.error('Session expired. Please login again.');
      userSetter.setUser(null);
      return Promise.reject(error);
    }

    const isRefreshRoute = originalRequest?.url?.includes('/auth/refresh');

if (isRefreshRoute) {
    return Promise.reject(error);
}


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const isAuthRoute =
        originalRequest?.url?.includes('/auth-user') ||
        originalRequest?.url?.includes('/register') ||
        originalRequest?.url?.includes('/refresh-tokens');

      if (isAuthRoute) {
        return Promise.reject(error);
      }

      try {
        const refreshToken = await authStorage.getRefreshToken();

        if (!refreshToken) {
          await authStorage.removeTokens();
          await cache.clear('userDetails');
          Toast.error('Session expired. Please login again.');
          userSetter.setUser(null);
          return Promise.reject(error);
        }

        const refreshResponse = await apiClient.post(
          '/auth/refresh',
          {},
          {
            headers: {
              'x-refresh-token': refreshToken,
            },
          },
        );

        console.log('renewed', refreshResponse)
        const accessToken = refreshResponse.data?.data?.accessToken;
const newRefreshToken = refreshResponse.data?.data?.refreshToken;

if (refreshResponse.ok && accessToken) {
  await authStorage.storeTokens(accessToken, newRefreshToken || refreshToken);
  originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
  return apiClient.axiosInstance(originalRequest);
}

        // if (
        //   refreshResponse.status === 200 &&
        //   refreshResponse.data?.accessToken
        // ) {
        //   const { accessToken, refreshToken: newRefreshToken } =
        //     refreshResponse.data;

        //   await authStorage.storeTokens(
        //     accessToken,
        //     newRefreshToken || refreshToken,
        //   );

        //   originalRequest.headers['x-auth-token'] = accessToken;
        //   return apiClient.axiosInstance(originalRequest);
        // }
        
        else {
          console.log(' Refresh failed - invalid response');
          await cache.clear('userDetails');
          await authStorage.removeTokens();
          Toast.error('Session expired. Please login again.');
          userSetter.setUser(null);
          return Promise.reject(error);
        }
      } catch (err) {
        await cache.clear('userDetails');
        await authStorage.removeTokens();
        Toast.error('Session expired. Please login again.');
        userSetter.setUser(null);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
