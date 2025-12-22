import { request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/user/login',
    method: 'POST',
    data: {
      userName,
      password
    }
  });
}

/**
 * Get user info
 *
 * @param userId User ID
 */
export function fetchGetUserInfo(userId: number = 0) {
  return request<Api.Auth.UserInfo>({ url: `/user/info${userId ? `/${userId}` : ''}` });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/user/refresh_token',
    method: 'POST',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
