declare namespace Api {
  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    type CommonQueryParams = {
      querySearch: string;
      type: number;
      dateTime: string[];
    };

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      description: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'status'> & CommonSearchParams & Pick<CommonQueryParams, 'querySearch'>
    >;

    /** role add params */
    type RoleAddParams = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'description' | 'status'>;

    /** role update params */
    type RoleUpdateParams = RoleAddParams & Pick<Api.SystemManage.Role, 'id'>;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = 1 | 2;

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      gender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      phone: string;
      /** user email */
      email: string;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'gender' | 'phone' | 'email' | 'status'> &
        CommonSearchParams &
        Pick<CommonQueryParams, 'querySearch'>
    >;

    /** user add params */
    type UserAddParams = Pick<
      Api.SystemManage.User,
      'userName' | 'gender' | 'nickName' | 'status' | 'phone' | 'email'
    > & {
      roles: number[];
    };

    /** user update params */
    type UserUpdateParams = UserAddParams & Pick<Api.SystemManage.User, 'id'>;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - 1: directory
     * - 2: menu
     */
    type MenuType = 1 | 2;

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = 1 | 2;

    /**
     * layout type
     *
     * - "1": "base"
     * - "2": "blank"
     */
    type LayoutType = 'base' | 'blank';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuAddParams = Pick<
      Api.SystemManage.Menu,
      | 'menuType'
      | 'menuName'
      | 'routeName'
      | 'routePath'
      | 'component'
      | 'order'
      | 'i18nKey'
      | 'icon'
      | 'iconType'
      | 'status'
      | 'parentId'
      | 'keepAlive'
      | 'constant'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
    > & {
      query: NonNullable<Api.SystemManage.Menu['query']>;
      buttons: NonNullable<Api.SystemManage.Menu['buttons']>;
    };

    /** menu update params */
    type MenuUpdateParams = MenuAddParams & Pick<Api.SystemManage.Menu, 'id'>;

    /** menu search params */
    type MenuSearchParams = CommonType.RecordNullable<CommonSearchParams>;

    /** menu tree */
    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }
}
