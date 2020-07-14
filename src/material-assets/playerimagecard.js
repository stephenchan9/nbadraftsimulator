import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

/*
  Reusable component that creates a card for a play obj passed in.
*/
const useStyles = makeStyles({
  root: {
    maxHeight: 300,
    maxWidth: 200,
  },
  media: {
    height: 140,
  }
});

export default function PlayerImageCard(props) {
  const classes = useStyles();
  const playerObj = props.player;

  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia 
          className ={classes.media}
          component="img"
          alt={playerObj.name}
          image={playerObj.img}
          title={playerObj.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {playerObj.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            PPG: {playerObj.stats.ppg} APG: {playerObj.stats.apg}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}

PlayerImageCard.propTypes = {
  player: PropTypes.object,
};