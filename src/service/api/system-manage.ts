import { request } from '../request';

/**
 * get role list
 * 获取角色列表
 * @param params - role search params
 * @returns role list - 角色列表
 */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/role/page',
    method: 'GET',
    params
  });
}

/**
 * add role
 * 添加角色
 * @param params - role add params
 * @returns operation response - 操作响应
 */
export function fetchAddRole(params?: Api.SystemManage.RoleAddParams) {
  return request<Api.Common.OperationResponse>({
    url: '/role/add',
    method: 'POST',
    data: params
  });
}

/**
 * update role
 * 更新角色
 * @param params - role update params
 * @returns operation response - 操作响应
 */
export function fetchUpdateRole(params?: Api.SystemManage.RoleUpdateParams) {
  return request<Api.Common.OperationResponse>({
    url: '/role/update',
    method: 'PUT',
    data: params
  });
}

/**
 * remove role
 * 删除角色
 * @param params - role id list
 * @returns operation response - 操作响应
 */
export function fetchRemoveRole(params: Api.SystemManage.Role['id'][]) {
  return request<Api.Common.OperationResponse>({
    url: '/role/remove',
    method: 'DELETE',
    data: params
  });
}

/**
 * get all roles
 * 获取所有角色
 * @returns all roles - 所有角色
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/role/all',
    method: 'GET'
  });
}

/**
 * get user list
 * 获取用户列表
 * @param params - user search params
 * @returns user list - 用户列表
 */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/user/page',
    method: 'GET',
    params
  });
}

/**
 * add user
 * 添加用户
 * @param params - user add params
 * @returns operation response - 操作响应
 */
export function fetchAddUser(params?: Api.SystemManage.UserAddParams) {
  return request<Api.Common.OperationResponse>({
    url: '/user/add',
    method: 'POST',
    data: params
  });
}

/**
 * update user
 * 更新用户
 * @param params - user update params
 * @returns operation response - 操作响应
 */
export function fetchUpdateUser(params?: Api.SystemManage.UserUpdateParams) {
  return request<Api.Common.OperationResponse>({
    url: '/user/update',
    method: 'PUT',
    data: params
  });
}

/**
 * remove user
 * 删除用户
 * @param params - user id list
 * @returns operation response - 操作响应
 */
export function fetchRemoveUser(params: Api.SystemManage.User['id'][]) {
  return request<Api.Common.OperationResponse>({
    url: '/user/remove',
    method: 'DELETE',
    data: params
  });
}

/**
 * add menu
 * 添加菜单
 * @param params - menu add params
 * @returns operation response - 操作响应
 */
export function fetchAddMenu(params: Api.SystemManage.MenuAddParams) {
  return request<Api.Common.OperationResponse>({
    url: '/menu/add',
    method: 'POST',
    data: params
  });
}

/**
 * update menu
 * 更新菜单
 * @param params - menu update params
 * @returns operation response - 操作响应
 */
export function fetchUpdateMenu(params: Api.SystemManage.MenuUpdateParams) {
  return request<Api.Common.OperationResponse>({
    url: '/menu/update',
    method: 'POST',
    data: params
  });
}

/**
 * get menu list
 * 获取菜单列表
 * @param params - menu search params
 * @returns menu list - 菜单列表
 */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/menu/page',
    method: 'GET',
    params
  });
}

/**
 * get all pages
 * 获取所有菜单页
 * @returns all pages - 所有菜单页
 */
export function fetchGetAllPages() {
  return request<CommonType.Option[]>({
    url: '/menu/all',
    method: 'GET'
  });
}

/**
 * get menu tree
 * 获取菜单树结构
 * @returns 菜单树
 */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/menu/tree',
    method: 'GET'
  });
}

/**
 * get role-associated menu
 * 获取角色关联菜单
 * @param roleId 角色id
 * @returns 菜单列表
 */
export function fetchGetRoleMenus(roleId: number) {
  return request<Api.SystemManage.Menu['id'][]>({
    url: `/role/menus/${roleId}`,
    method: 'GET'
  });
}

export function fetchUpdateRoleMenus(params: Api.SystemManage.RoleMenuUpdateParams) {
  return request<Pick<Api.SystemManage.Menu, 'id'>[]>({
    url: '/role/relatedMenu',
    method: 'POST',
    data: params
  });
}
