import React from "react";
import { Box, Image, Text, Card } from "rebass";

import { Button } from "rebass";
import { Label, Input } from "@rebass/forms";

// const nba = require('nba.js').default;

// import nba from "nba-api-client";
const nba = require("nba-api-client");

class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      headshot: null,
      draftBoard: []
    };

    // Bind the function to give access to props.
    this.addToBoard = this.addToBoard.bind(this);
    this.removeFromBoard = this.removeFromBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerDetails = this.getPlayerDetails.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  getPlayerDetails(event) {
    event.preventDefault();
    const player = nba.getPlayerID(this.state.name);

    if (player) {
      const playerId = player.PlayerID;
      const teamId = player.TeamID;

      const params = {
        PlayerID: playerId,
        TeamID: teamId,
      };
      // Get the player headshot
      const img = nba.getPlayerHeadshotURL(params);

      this.setState({ headshot: img });
    }
  }

  addToBoard(event) {
    event.preventDefault();
    const draftBoard = this.props.draftBoard;
    let alreadyExists = false;

    for (let i = 0; i < draftBoard.length; i++) {
      if (draftBoard[i].name === this.state.name) {
        alreadyExists = true;
      }
    }

    // Call the dispatch function to add to the player if not already in the board.
    if (!alreadyExists) {
      this.props.addPlayer(this.state.headshot, this.state.name);
    }
  }

  removeFromBoard(event) {
    event.preventDefault();

    // Call the dispatch function to remove the player if not already in the board.
    this.props.removePlayer(this.state.name);
  }

  render() {
    //const headshot = this.state.headshot;
    // const name = this.state.value;
    const img = this.state.headshot;
    const name = this.state.name;

    return (
      <React.Fragment>
        <Box width={[1 / 2, 1 / 2, 1 / 2]}>
          <Label htmlFor="player">Enter a player</Label>
          <Input
            id="player"
            name="player"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button type="submit" value="submit" onClick={this.getPlayerDetails}>
            Submit
          </Button>
        </Box>
        {/* conditional rendering */}
        {img ? (
          <Card>
            <Image src={img} />
            <Text>{name}</Text>
            <Button onClick={this.addToBoard}>Add Player</Button>
            <Button variant="outline" onClick={this.removeFromBoard}>Remove Player</Button>
          </Card>
        ) : (
          <Card />
        )}
      </React.Fragment>
    );
  }
}

export default PlayerSearch;
