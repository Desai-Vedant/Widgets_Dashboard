import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Widgets from "./Widgets";
import dashboardLogo from "../../assets/dashboard-logo.svg";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "widgets",
    title: "Widgets",
    icon: <WidgetsIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
];

const demoTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function decidePage(pathname) {
  const pages = { dashboard: Dashboard, widgets: Widgets, profile: Profile };
  const pageKey = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const PageComponent = pages[pageKey];
  return PageComponent ? (
    <PageComponent />
  ) : (
    <Typography>Page not found</Typography>
  );
}

function PageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {decidePage(pathname)}
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutSidebarCollapsed(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={dashboardLogo} alt="Dashboard logo" style={{ height: 40, width: 40 }} />,
        title: "MyDashboard",
        homeUrl: "dashboard",
      }}
      router={router}
      theme={demoTheme}
      window={window ? window() : undefined}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <PageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutSidebarCollapsed.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSidebarCollapsed;
