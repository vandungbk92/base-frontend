import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './DefaultLayout/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('../views/Dashboard'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('../views/Profile'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('../views/Users'),
  loading: Loading,
});

const Units = Loadable({
  loader: () => import('../views/Units/Units'),
  loading: Loading,
});

const Unit = Loadable({
  loader: () => import('../views/Units/Unit/Unit'),
  loading: Loading,
});

const Invoices = Loadable({
  loader: () => import('../views/Invoices'),
  loading: Loading,
})

const Permissions = Loadable({
  loader: () => import('../views/Permissions'),
  loading: Loading,
})

const Permission = Loadable({
  loader: () => import('../views/Permissions/Permission'),
  loading: Loading,
})

const Groups = Loadable({
  loader: () => import('../views/Groups'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/',          exact: true, name: 'Home',                  component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard',             component: Dashboard },
  { path: '/users',     exact: true, name: 'Quản lý người dùng',    component: Users},
  { path: '/users/edit/:id',   exact: true, name: 'Chỉnh sửa người dùng',    component: Users},
  { path: '/users/create',   exact: true, name: 'Thêm mới người dùng',    component: Users},
  { path: '/profile',   exact: true, name: 'Thông tin người dùng',  component: Profile},
  { path: '/groups',    exact: true, name: 'Nhóm người dùng',       component: Groups}
  /*{path: URL.HOME, exact: true, name: RESOURCE[0].home, component: DefaultLayout},
 {path: URL.DASHBOARD, name: RESOURCE[0].dashBroad, component: Dashboard},
 {path: URL.PROFILE, name: RESOURCE[0].profile, component: Profile},
 {path: URL.USERS, exact: true, name: RESOURCE[0].managerUser, component: Users},
 {path: URL.USER_ID.format(':id'), exact: true, name: RESOURCE[0].userInfo, component: User},
 {path: URL.UNITS, exact: true, name: RESOURCE[0].managerUnit, component: Units},
 {path: URL.UNIT_ID.format(':id'), exact: true, name: RESOURCE[0].unitInfo, component: Unit},
 {path: URL.REQUESTS, exact: true, name: RESOURCE[0].managerUser, component: Users},
 {path: URL.REQUEST_ID.format(':id'), exact: true, name: RESOURCE[0].userInfo, component: User},
 {path: URL.SERVICES, exact: true, name: RESOURCE[0].managerUnit, component: Units},
 {path: URL.SERVICE_ID.format(':id'), exact: true, name: RESOURCE[0].unitInfo, component: Unit},
 {path: URL.CATEGORIES, exact: true, name: RESOURCE[0].managerUnit, component: Units},
 {path: URL.CATEGORY_ID.format(':id'), exact: true, name: RESOURCE[0].unitInfo, component: Unit},
 {path: URL.FAQS, exact: true, name: RESOURCE[0].managerUnit, component: Units},
 {path: URL.FAQ_ID.format(':id'), exact: true, name: RESOURCE[0].unitInfo, component: Unit},
 {path: URL.REPORT_STATISTICAL, exact: true, name: RESOURCE[0].managerUnit, component: Units},
 {path: URL.SETTINGS.format(':id'), exact: true, name: RESOURCE[0].unitInfo, component: Unit},
 {path: URL.PERMISSIONS, exact: true, name: RESOURCE[0].managerPermissions, component: Permissions},
 {path: URL.PERMISSION_ID.format(':id'), exact: true, name: RESOURCE[0].managerPermissions, component: Permission},

 {path: URL.LINK_DEMO, exact: true, name: RESOURCE[0].managerUser, component: Users},
  {path: URL.GROUPS, exact: true, name: RESOURCE[0].managerGroup, component: Groups}*/


];

export default routes;
