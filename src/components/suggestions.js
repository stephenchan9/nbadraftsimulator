import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";


/**
 * Child Component of PlayerSearch conistsing of player suggestions in the forms of buttons.
 * These will start off with hardcoded values and hopefully mold into real time player changes.
 * Will use buttons for now.
 */
class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    // this gets the number of players in the playersuggestion.json
    const count = Object.keys(this.props.players).length;

    this.state = {
      playerCount: count,
    };

    this.generatePlayerButtons = this.generatePlayerButtons.bind(this);
  }

  // function creates an array of buttons for the player to click on.
  generatePlayerButtons() {
    let suggestionButtons = [];
    let players = this.props.players;
    let suggestionClick = this.props.suggestionClick;

    for (let key in players) {
      const btn = (
        <Box mt={0.5} key={key}>
          <Button
            variant="contained"
            color="primary"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            onClick={() => suggestionClick(key)}
          >
            {key}
          </Button>
        </Box>
      );
      suggestionButtons.push(btn);
    }
    return suggestionButtons;
  }
  render() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="flex-end" alignItems="flex-end">
          {this.generatePlayerButtons()}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Suggestions;

Suggestions.propTypes = {
  players: PropTypes.array.isRequired,
  suggestionClick: PropTypes.func.isRequired
};