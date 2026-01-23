import { request } from '../request';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/menu/constants' });
}

/** get user routes */
export function fetchGetUserRoutes() {
  return request<Api.Route.UserRoute>({ url: '/menu/userRoutes' });
}

/**
 * whether the route is existed
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
