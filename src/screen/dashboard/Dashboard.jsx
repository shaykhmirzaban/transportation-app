import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { signOutUser, user_is_signin } from "../../config/FirebaseMethods";
import SMLabel from "../../components/SMLabel";
import SMLabel1 from "../../components/SMLabe1";

// style
import "../../style/dashboard/dashboard.scss";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let [flag, setFlag] = React.useState();
  let [label, setLabel] = React.useState("");
  let [name, setName] = React.useState("");
  let navigate = useNavigate();
  let { id } = useParams();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    user_is_signin()
      .then((_) => {
        if (_.email === "admin@admin.com") {
          setFlag(true);
        }
      })
      .catch((_) => console.log(_));
  }, []);

  const logoutUser = () => {
    signOutUser()
      .then((_) => {
        setLabel("Successfullt Logout");
        navigate("/login");
      })
      .catch((_) => {
        setLabel(_);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Box display="flex" justifyContent="space-between">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {name
                ? name
                : flag
                ? "Welcome to Admin Panel"
                : "Welcome to User Profile"}
            </Typography>
          </Toolbar>

          <div className="logout" onClick={logoutUser}>
            <h4>
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </h4>
          </div>
        </Box>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {flag
            ? ""
            : [
                {
                  name: "Go back",
                  icons: "fa-solid fa-house-chimney",
                  routeName: "/",
                },
                {
                  name: "User Profile",
                  icons: "fa-solid fa-house-chimney",
                  routeName: `/dashboard/${id}`,
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(text.routeName);
                      setName(text.name);
                    }}
                  >
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>

        <Divider />
        <List>
          {flag
            ? [
                {
                  name: "Create Transport",
                  routeName: "create-transport",
                  icons: "fa-solid fa-clipboard",
                },
                {
                  name: "Create Course",
                  routeName: "create-course",
                  icons: "fa-solid fa-book",
                },
                {
                  name: "Create Result",
                  routeName: "create-result",
                  icons: "fa-solid fa-square-poll-vertical",
                },
                {
                  name: "Add Countries",
                  routeName: "add-countries",
                  icons: "fa-solid fa-earth-americas",
                },
                {
                  name: "Add Cities",
                  routeName: "add-cities",
                  icons: "fa-solid fa-city",
                },
                {
                  name: "course and sec control",
                  routeName: "student-registration-form-course-and-sec-control",
                  icons: "fa-solid fa-gamepad",
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(text.routeName);
                      setName(text.name);
                    }}
                  >
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>

        <Divider />
        <List>
          {flag
            ? [
                {
                  name: "Transport List",
                  routeName: "transport-list",
                  icons: "fa-solid fa-list-ul",
                },
                {
                  name: "Student Registration List",
                  routeName: "student-registration-list",
                  icons: "fa-solid fa-list-ul",
                },
                {
                  name: "Trainer Registration List",
                  routeName: "trainer-registration-list",
                  icons: "fa-solid fa-list-ul",
                },

                {
                  name: "Show Result",
                  routeName: "show-result",
                  icons: "fa-solid fa-square-poll-horizontal",
                },
                {
                  name: "enrolled student",
                  routeName: "enrolled-student",
                  icons: "fa-solid fa-user",
                },
                {
                  name: "Branch",
                  routeName: "branch",
                  icons: "fa-solid fa-code-branch",
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(text.routeName);
                      setName(text.name);
                    }}
                  >
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : [
                {
                  name: "Detail",
                  routerName: "detail",
                },
                {
                  name: "Create List",
                  routerName: "create-list",
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(text.routerName);
                      setName(text.name);
                    }}
                  >
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>

        <Divider />
        <List>
          {[
            {
              name: "Logout",
              icons: "fa-solid fa-right-from-bracket",
            },
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={logoutUser}>
                <ListItemIcon>
                  {text.icons && <i className={text.icons}></i>}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ padding: "5rem 0 0 2rem" }}>
        <Outlet />
        {label && <SMLabel name={label} />}
        {label && <SMLabel1 name={label} />}
      </Box>
    </Box>
  );
}
