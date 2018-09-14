import {URL} from "../common/url";
import {RESOURCE} from "../common/resource";

export default {
  items: [
    {
      name: RESOURCE[0].dashBroad,
      url: URL.DASHBOARD,
      icon: 'icon-speedometer',
    },
    {
      name: RESOURCE[0].managerUser,
      url: URL.USERS,
      icon: 'icon-people',
    },
    {
      name: RESOURCE[0].managerUnit,
      url: URL.UNITS,
      icon: 'icon-home',
    },
    {
      name: RESOURCE[0].managerRequest,
      url: URL.REQUESTS,
      icon: 'icon-envelope',
    },
    {
      name: RESOURCE[0].managerCategory,
      url: URL.CATEGORIES,
      icon: 'icon-list',
    },
    {
      name: RESOURCE[0].managerService,
      url: URL.SERVICES,
      icon: 'icon-energy',
    },
    {
      name: RESOURCE[0].managerFaq,
      url: URL.FAQS,
      icon: 'icon-question',
    },
    {
      name: RESOURCE[0].reportStatistical,
      url: URL.REPORT_STATISTICAL,
      icon: 'icon-chart',
    },
    {
      name: RESOURCE[0].settings,
      url: URL.SETTINGS,
      icon: 'icon-settings',
    },
    {
      name: RESOURCE[0].managerPermissions,
      url: URL.PERMISSIONS,
      icon: 'icon-link',
    },
  ],
};
