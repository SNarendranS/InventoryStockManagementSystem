import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ExpandLess, ExpandMore, Inventory } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../Store/userTokenSlice";
import type { RootState } from "../Store/store";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [avatarMenuAnchor, setAvatarMenuAnchor] = React.useState<null | HTMLElement>(null);

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [currentSubMenu, setCurrentSubMenu] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userToken.user);

  const navItems = React.useMemo(() => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          "Dashboard",
          { Categories: ["View Categories", "Add Category"] },
          { Products: ["View Products", "Add Product"] },
          { Transactions: ["View Transactions", "Make Transaction"] },
          { "Employees": ["View Employees", "Add Employee"] },

          "Reports"
        ];
      case "manager":
        return [
          "Dashboard",
          { Categories: ["View Categories", "Add Category"] },
          { Products: ["View Products", "Add Product"] },
          { Transactions: ["View Transactions", "Make Transaction"] },
          "Your Team",
          "Reports"
        ];
      case "employee":
        return [
          "Dashboard",
          "View Categories",
          "View Products",
          { Transactions: ["View Transactions", "Make Transaction"] }
        ];
      default:
        return ["Dashboard"];
    }
  }, [user]);

  const handleNavigate = (path: string) => {
    navigate("/" + path.toLowerCase().replaceAll(" ", "-"));
  };
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

  // Toggle submenus
  const handleToggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };
  // Avatar Menu
  const handleAvatarClick = (e: any) => setAvatarMenuAnchor(e.currentTarget);
  const closeAvatarMenu = () => setAvatarMenuAnchor(null);

  const handleLogout = () => dispatch(clearToken());

  // Dropdown Menu
  const openSubMenu = (event: any, title: string) => {
    setMenuAnchor(event.currentTarget);
    setCurrentSubMenu(title);
  };
  const closeSubMenu = () => {
    setMenuAnchor(null);
    setCurrentSubMenu(null);
  };

  return (
    <>
      {/* TOP BAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "#ffffff",
          borderBottom: "1px solid #eaeaea",
          color: "#333",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "64px",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, "&:hover": { cursor: "pointer" }, }}
              onClick={() => {
                navigate("/dashboard")
              }}>

              <Inventory sx={{ color: "goldenrod" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                Inventory Manager
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
                {navItems.map((item, index) => {
                  if (typeof item === "string") {
                    return (
                      <Button
                        key={index}
                        onClick={() => handleNavigate(item)}
                        sx={{
                          color: "#444",
                          textTransform: "none",
                          fontSize: "0.95rem",
                          px: 2,
                          py: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            background: "#f6f6f6",
                            color: "goldenrod",
                          },
                        }}
                      >
                        {item}
                      </Button>
                    );
                  }

                  // Dropdown (Categories / Products / Transactions)
                  const title = Object.keys(item)[0];
                  const subItems = Object.values(item)[0];

                  return (
                    <React.Fragment key={index}>
                      <Button
                        onClick={(e) => openSubMenu(e, title)}
                        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
                        sx={{
                          color: "#444",
                          textTransform: "none",
                          fontSize: "0.95rem",
                          px: 1.5,
                          py: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f6f6f6",
                            color: "goldenrod",
                          },
                        }}
                      >
                        {title}
                      </Button>

                      <Menu
                        anchorEl={menuAnchor}
                        open={currentSubMenu === title}
                        onClose={closeSubMenu}
                        TransitionComponent={Fade}
                        PaperProps={{
                          elevation: 3,
                          sx: {
                            mt: 1,
                            borderRadius: "10px",
                            minWidth: 200,
                          },
                        }}
                      >
                        {subItems.map((sub: string, i: number) => (
                          <MenuItem
                            key={i}
                            onClick={() => {
                              handleNavigate(sub);
                              closeSubMenu();
                            }}
                          >
                            {sub}
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* RIGHT SIDE (Avatar + Mobile Menu) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}

            <Tooltip title="Account Settings">
              <Avatar
                sx={{ width: 38, height: 38, cursor: "pointer", border: `3px solid ${user?.role == "admin" ? "green" : user?.role == "manager" ? "orange" : "red"}` }}
                onClick={handleAvatarClick}
                src="https://i.pravatar.cc/80"
              />
            </Tooltip>
          </Box>

          {/* Avatar Popup */}
          <Menu
            anchorEl={avatarMenuAnchor}
            open={Boolean(avatarMenuAnchor)}
            onClose={closeAvatarMenu}
            PaperProps={{ sx: { borderRadius: "12px", mt: 1 } }}
          >
            <MenuItem onClick={() => { handleNavigate("profile");; closeAvatarMenu(); }}>My Profile</MenuItem>
            <MenuItem onClick={() => { handleNavigate("profile");; closeAvatarMenu(); }}>Notifications</MenuItem>
            <MenuItem onClick={() => { handleNavigate("profile");; closeAvatarMenu(); }}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260 }}>
          <Typography
            sx={{ fontWeight: 600, p: 2, borderBottom: "1px solid #eee", fontSize: "1.1rem" }}
          >
            Inventory Menu
          </Typography>

          <List>
            {navItems.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleNavigate(item);
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                );
              }

              // Dropdown menu
              const title = Object.keys(item)[0];
              const subItems = Object.values(item)[0];

              return (
                <React.Fragment key={index}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleToggleMenu(title)}>
                      <ListItemText primary={title} />
                      {openMenus[title] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={openMenus[title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subItems.map((sub: string, i: number) => (
                        <ListItem key={i} disablePadding sx={{ pl: 4 }}>
                          <ListItemButton
                            onClick={() => {
                              handleNavigate(sub);
                              setDrawerOpen(false);
                            }}
                          >
                            <ListItemText primary={sub} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Drawer>

    </>
  );
};

export default Header;