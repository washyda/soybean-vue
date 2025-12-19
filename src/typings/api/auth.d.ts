declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface Role {
      /* 角色id */
      id: number;
      /* 角色名称 */
      roleName: string;
      /* 角色编码 */
      roleCode: string;
      /* 角色描述 */
      description: string;
      /* 角色状态 */
      status: number;
    }

    interface UserInfo {
      /* 用户id */
      userId: string;
      /* 用户名 */
      userName: string;
      /* 手机号 */
      phone: string;
      /* 邮箱 */
      email: string;
      /* 昵称 */
      nickName: string;
      /* 角色列表 */
      roles: Role[];
      /* 按钮权限列表 */
      buttons: string[];
    }
  }
}
