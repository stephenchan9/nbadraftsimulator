import React from "react";
import { Button, Box } from "rebass";

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
        <Button variant="outline" m={.3} key={key} onClick={() => suggestionClick(key)}>
          {key}
        </Button>
      );
      suggestionButtons.push(btn);
    }
    return suggestionButtons;
  }
  render() {
    return (
      <React.Fragment>
        <Box
          sx={{
            display: "grid",
          }}
        >
          {this.generatePlayerButtons()}
        </Box>
      </React.Fragment>
    );
  }
}

export default Suggestions;
