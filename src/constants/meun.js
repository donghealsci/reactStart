export const menus = [
  { key: '1', link: '/setup/index', title: '首页', icon: 'home' },
  { key: '2', link: '/setup/index/client', title: '认证客户端管理', icon: 'api' },
  {
    key: '3',
    link: '',
    title: '用户管理',
    icon: 'user',
    sub: [
      { key: '4', link: '/setup/index/user/userManage', title: '用户管理', icon: '' }
    ]
  },
  {
    key: '5',
    link: '',
    title: '角色管理',
    icon: 'idcard',
    sub: [
      { key: '6', link: '/setup/index/role/roleManage', title: '角色管理', icon: '' }
    ]
  },
  {
    key: '7',
    link: '',
    title: '组管理',
    icon: 'usergroup-add',
    sub: [
      { key: '8', link: '/setup/index/group/groupManage', title: '组管理', icon: '' }
    ]
  },
  {
    key: '9',
    link: '',
    title: '项目管理',
    icon: 'appstore',
    sub: [
      { key: '10', link: '/setup/index/app/appManage', title: '项目管理', icon: '' }
    ]
  },
  {
    key: '11',
    link: '',
    title: '个人中心',
    icon: 'key',
    sub: [
      { key: '12', link: '/setup/index/personal/password', title: '修改密码', icon: '' }
    ]
  },
  {
    key: '13',
    link: '',
    title: 'App资讯',
    icon: 'notification',
    sub: [
      { key: '14', link: '/setup/index/appinfo/appinfo', title: 'App资讯', icon: '' }
    ]
  }
]

// export const menus = [
//   {
//     'key': '1',
//     'link': '/setup/index',
//     'title': '首页',
//     'icon': 'home',
//     'sub': null
//   },
//   {
//     'key': '2',
//     'link': '/setup/index/client',
//     'title': '认证客户端管理',
//     'icon': 'api',
//     'sub': null
//   },
//   {
//     'key': '3',
//     'link': '/setup/index/user',
//     'title': '用户管理',
//     'icon': 'user',
//     'sub': [
//       {
//         'key': '4',
//         'link': '/setup/index/user/userManage',
//         'title': '用户管理',
//         'icon': '',
//         'sub': null
//       },
//       {
//         'key': '5',
//         'link': '/setup/index/role/roleManage',
//         'title': '角色管理',
//         'icon': '',
//         'sub': null
//       }
//     ]
//   },
//   {
//     'key': '6',
//     'link': '/setup/index/personal',
//     'title': '个人信息管理',
//     'icon': 'profile',
//     'sub': [
//       {
//         'key': '7',
//         'link': '/setup/index/personal/profile',
//         'title': '个人资料',
//         'icon': '',
//         'sub': null
//       },
//       {
//         'key': '8',
//         'link': '/setup/index/personal/password',
//         'title': '修改密码',
//         'icon': '',
//         'sub': null
//       }
//     ]
//   }
// ]
