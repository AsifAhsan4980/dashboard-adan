/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UpdateDailyAdan from "./views/UpdateDailyAdan";
import JummahData from "./views/JummahData";
import Ramadan from "./views/Ramadan";
import Announcement from "./views/Announcement";
import Event from './views/event'
import Banner from "./views/Banner";


const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/dailyAdan",
    name:"Daily Adan",
    icon: "nc-icon nc-circle-09",
    component: UpdateDailyAdan,
    layout: "/admin",
  },
  {
    path: "/Jummah",
    name: "Jummah & Others",
    icon: "nc-icon nc-notes",
    component: JummahData,
    layout: "/admin",
  },
  {
    path: "/ramadan",
    name: "Ramadan",
    icon: "nc-icon nc-paper-2",
    component: Ramadan,
    layout: "/admin",
  },
  {
    path: "/announcement",
    name: "Announcement",
    icon: "nc-icon nc-atom",
    component: Announcement,
    layout: "/admin",
  },
  {
    path: "/event",
    name: "Event",
    icon: "nc-icon nc-pin-3",
    component: Event,
    layout: "/admin",
  },
  {
    path: "/banner",
    name: "Banner",
    icon: "nc-icon nc-bell-55",
    component: Banner,
    layout: "/admin",
  },
];

export default dashboardRoutes;
