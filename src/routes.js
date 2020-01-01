import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import Public from "@material-ui/icons/Public";
import VpnLock from "@material-ui/icons/VpnLock";

import DashboardManager from "./containers/Dashboard";
import Ask from "./containers/Asks";
import Learn from "./containers/Learns";
import Video from "./containers/Videos";
import User from "./containers/Users";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardManager,
    layout: "/admin"
  },
  {
    path: "/list-ask",
    name: "Asks",
    icon: Public,
    component: Ask,
    layout: "/admin"
  },
  {
    path: "/list-learn",
    name: "Learns",
    icon: VpnLock,
    component: Learn,
    layout: "/admin"
  },
  {
    path: "/video",
    name: "Videos",
    icon: VideoLibrary,
    component: Video,
    layout: "/admin"
  },
  {
    path: "/account",
    name: "Users",
    icon: People,
    component: User,
    layout: "/admin"
  }
];

export default dashboardRoutes;
