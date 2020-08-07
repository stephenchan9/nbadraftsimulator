/*
    Permnanent drawer
    https://material-ui.com/components/drawers/#drawer

    keep this as a functional component in order to allow useStyles function to work. useStyles is a hook api 
    and cannot be used inside classes.
*/

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

// Icons from material
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SettingsApplicationsOutlinedIcon from "@material-ui/icons/SettingsApplicationsOutlined";

// imported components
import DraftBoardContainer from "../containers/draftboardcontainer";
import PlayerSearchContainer from "../containers/playersearchcontainer.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  control: {
    padding: theme.spacing(2),
  },
}));

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("Homepage is mounted");
  });

  // sections to build in the drawers.
  const sections = [
    { text: "Home", icon: <HomeOutlinedIcon /> },
    { text: "Boards", icon: <ListAltOutlinedIcon /> },
    { text: "Players", icon: <PeopleAltOutlinedIcon /> },
  ];

  const sections2 = [
    { text: "Settings", icon: <SettingsApplicationsOutlinedIcon /> },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* import the heading from homepage */}
          <Typography variant="h6" noWrap>
            {props.heading}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {sections.map((section) => (
            <ListItem button key={section.text}>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sections2.map((section) => (
            <ListItem button key={section.text}>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="row">
          <Grid item xs={4}>
            {/* Import the draft board container */}
            <DraftBoardContainer players={props.draftBoard} />
          </Grid>
          <Grid item xs={6}>
            {/* Import the player search container */}
            <PlayerSearchContainer />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  heading: PropTypes.string,
  draftBoard: PropTypes.array.isRequired,
};
