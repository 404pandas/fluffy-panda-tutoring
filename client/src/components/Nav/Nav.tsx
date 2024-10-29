import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  "Data Types",
  "CSS Selectors",
  "DOM Traversal",
  "DOM Tree",
  "Login",
];

interface NavProps {
  currentPage: string;
}

const Nav: React.FC<NavProps> = ({ currentPage }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        <ListItemButton component={Link} to={"/"}>
          <ListItemText primary={"Fluffy Panda Tutoring"} />
        </ListItemButton>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          const lowerCaseItem = item.toLowerCase().replace(/\s+/g, "");
          return (
            <ListItem key={item} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${lowerCaseItem}`}
                sx={{
                  backgroundColor:
                    currentPage === `/${lowerCaseItem}`
                      ? "lightblue"
                      : "transparent",
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to={"/"}>Fluffy Panda Tutoring</Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => {
              const lowerCaseItem = item.toLowerCase().replace(/\s+/g, "");
              return (
                <Button
                  key={item}
                  component={Link}
                  to={`/${lowerCaseItem}`}
                  sx={{
                    color: "#fff",
                    backgroundColor:
                      currentPage === `/${lowerCaseItem}`
                        ? "lightblue"
                        : "transparent",
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

Nav.propTypes = {
  currentPage: PropTypes.string.isRequired, // Ensure currentPage prop is required
};

export default Nav;
