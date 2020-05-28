import React from "react";
import { Box, Image, Text, Card, Flex } from "rebass";
import { Button } from "rebass";
import { Label, Input } from "@rebass/forms";
import Container from 'react-bootstrap/Container'
// child component of the playersearch box
import Suggestions from "./suggestions";
const players = require("../db/playerindex.json");


// import nba from "nba-api-client";
const nba = require("nba-api-client");
const data = require("nba.js").data; // Data from nba.data.net

class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      headshot: null,
      playerStats: null,
      careerSummary: {
        ppg: "",
        gamesPlayed: "",
      },
      lastSeason: null,
      draftBoard: [],
    };

    // Bind the function to give access to props.
    this.addToBoard = this.addToBoard.bind(this);
    this.removeFromBoard = this.removeFromBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerDetails = this.getPlayerDetails.bind(this);
    this.suggestionClick = this.suggestionClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  getPlayerDetails() {
    // nba-api-client
    //event.preventDefault();
    const player = nba.getPlayerID(this.state.name);
  
    if (player) {
      const playerId = player.PlayerID;
      const teamId = player.TeamID;

      // nba api-client
      const params = {
        PlayerID: playerId,
        TeamID: teamId,
      };
      // Get the player headshot
      const img = nba.getPlayerHeadshotURL(params);

      // Get their bio stats. Using nba.data api.
      const dataParams = {
        personId: playerId,
        year: 2019,
      };

      data.playerProfile(dataParams, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        const stats = res.league.standard.stats;
        console.log(stats);
        this.setState({ careerSummary: stats.careerSummary }); // Assign the stats here to use whenever in the state of the component.
        this.setState({ lastSeason: stats.latest }); // Assign the stats here to use whenever in the state of the component.
      });

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
      this.props.addPlayer(this.state.headshot, this.state.name, this.state.lastSeason);
    }
  }

  removeFromBoard(event) {
    event.preventDefault();

    // Call the dispatch function to remove the player if not already in the board.
    this.props.removePlayer(this.state.name);
  }

  // function creates an array of buttons for the player to click on.
  generatePlayerButtons() {
    let suggestionButtons = [];

    for (let key in players) {
      const btn = (
        <Button variant="outline" m={0.3} key={key} onClick={this.handleClick}>
          {key}
        </Button>
      );
      suggestionButtons.push(btn);
    }
    return suggestionButtons;
  }

  suggestionClick(player) {
    // Update the player input box with the button clicked. Then we can start the query for getPlayerDetails.
    // Place the getPlayerDetails function in a callback because setState is Async.
    this.setState({ name: player }, () =>{
      this.getPlayerDetails();
    });
  }

  render() {
    const img = this.state.headshot;
    const name = this.state.name;
    const careerStats =
      "" ||
      `Points: ${this.state.careerSummary.ppg}, Games: ${this.state.careerSummary.gamesPlayed}`;

    return (
      <React.Fragment>
        <Flex>
          {/* ------Player Search Box: Parent Component */}
          <Box mr={10} width={[1 / 2, 1 / 2, 1 / 2]}>
            <Label htmlFor="player">Enter a player</Label>
            <Input
              id="player"
              name="player"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              value="submit"
              onClick={() => this.getPlayerDetails()}
            >
              Submit
            </Button>
            {/* conditional rendering */}
            {img ? (
              <Card>
                <Image src={img} />
                <Text>{name}</Text>
                <Text>Player Bio:</Text>
                <Text color="primary">{careerStats}</Text>
                <Button onClick={this.addToBoard}>Add Player</Button>
                <Button variant="outline" onClick={this.removeFromBoard}>
                  Remove Player
                </Button>
              </Card>
            ) : (
              <Card />
            )}
          </Box>
          {/* ------Suggestions: Child Component */}
          <Box ml={10} width={[0.1, 0.1, 0.3]}>
            <Suggestions players={players} suggestionClick={this.suggestionClick} />
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

export default PlayerSearch;
