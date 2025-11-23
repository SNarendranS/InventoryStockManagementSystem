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
    useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const navItems = ["Dashboard", "Products", "Stock", "Transactions", "Reports"];

const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAvatarMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAvatarMenuAnchor(null);
    };

    const toggleDrawer = (val: boolean) => () => {
        setDrawerOpen(val);
    };
    const navigate = useNavigate()
    return (
        <>
            <AppBar
                position="static"
                elevation={2}
                sx={{
                    backgroundColor: "#ffffffff",
                    color: "#222",
                    borderBottom: "1px solid #eee"
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    {/* Left Side: Logo + Navigation */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Logo */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: 0.7,
                                cursor: "pointer"
                            }}
                        >
                            📦 Inventory Manager
                        </Typography>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
                                {navItems.map((item) => (
                                    <Button
                                        onClick={() =>navigate(`${item.toLowerCase().replaceAll(" ","-")}`)}
                                        key={item}
                                        color="inherit"
                                        sx={{
                                            minWidth: 100,
                                            maxWidth: 150,
                                            fontWeight: 500,
                                            textTransform: "none",
                                            paddingX: 2,
                                            borderRadius: "8px",
                                            transition: "0.2s",
                                            "&:hover": {
                                                backgroundColor: "#f2f2f2"
                                            }
                                        }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Right Side: Mobile Menu + Avatar */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Mobile menu icon */}
                        {isMobile && (
                            <IconButton onClick={toggleDrawer(true)} sx={{ mr: 1 }}>
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Avatar
                            sx={{ width: 36, height: 36, cursor: "pointer" }}
                            onClick={handleAvatarClick}
                            src="https://i.pravatar.cc/80"
                        />
                    </Box>

                    <Menu
                        anchorEl={avatarMenuAnchor}
                        open={Boolean(avatarMenuAnchor)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Notifications</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            p: 2,
                            borderBottom: "1px solid #eee"
                        }}
                    >
                        Inventory Menu
                    </Typography>

                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
