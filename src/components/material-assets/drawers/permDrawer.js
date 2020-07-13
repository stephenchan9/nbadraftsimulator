/*
    Permnanent drawer
    https://material-ui.com/components/drawers/#drawer

    keep this as a functional component in order to allow useStyles function to work. useStyles is a hook api 
    and cannot be used inside classes.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Icons from material
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';


import DraftBoardContainer from "../../../containers/draftboardcontainer"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));



export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  // sections to build in the drawers.
  const sections = [
    {text: "Home", icon: <HomeOutlinedIcon/>},
    {text: "Boards", icon: <ListAltOutlinedIcon/>},
    {text: "Players", icon: <PeopleAltOutlinedIcon/>},
  ];

  const sections2 = [
    {text: "Settings", icon:<SettingsApplicationsOutlinedIcon/> }
  ]

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
          {sections.map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>{sections.icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sections2.map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>{sections2.icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Import the draft board container */}
        <DraftBoardContainer players={props.players}/>
      </main>
    </div>
  );
}
