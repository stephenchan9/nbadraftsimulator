import React from "react";
import { Button, Box, Image, Text, Card } from "rebass";
import { Switch } from "@rebass/forms";
// Data from nba.data.net
const data = require("nba.js").data;
const nba = require("nba-api-client");
const playersDB = require("../db/players.json");
const teams = ["celtics", "jazz", "lakers", "bulls"];
const categories = [
  "apg",
  "bpg",
  "fgp",
  "ftp",
  "pfpg",
  "ppg",
  "spg",
  "tpg",
  "tpp",
  "trpg",
];

// Left side component of the homepage that will hold all players that were added on the draft board.
// This should be reading from the state.
class DraftBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.buildTeam = this.buildTeam.bind(this);
    this.teamLeadersRequest = this.teamLeadersRequest.bind(this);
  }

  // Function will toggle all players in draftboard to visible.
  handleToggle() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  // function builds the rest of the players using information from the draftboard.
  // What algorithm am I going to use to design this?
  /*
    total of 10 starters per lineup.
    1. get the total number of players currently in the draftboard.
    2. we will query for the team leaders for a respective team
    3. for this case lets just pick a certain team and then query for their leaders.
  */
  buildTeam() {
    const draftBoardPlayers = this.props.draftBoard;
    let restOfPlayersArr = [];

    // we start with 10 max players but make this number configurable in the future.
    let remainingPlayerCount = 10 - draftBoardPlayers.length;

    // We know we have to work with this many players.
    if (remainingPlayerCount > 0) {
      for (let i = 0; i < remainingPlayerCount; i++) {
        // we grab a random team and category query for their team leaders
        let randTeamIndex = Math.floor(
          Math.random() * Math.floor(teams.length - 1)
        );
        let randomCategoryIndex = Math.floor(
          Math.random() * Math.floor(categories.length - 1)
        );

        this.teamLeadersRequest(2019, teams[randTeamIndex])
          .then((result) => {
            console.log(result);

            let playerObj = result[categories[randomCategoryIndex]][0];

            // now we need to search our players.json for the player and team name
            for (let player of playersDB) {
              if (player.playerId === parseInt(playerObj.personId)) {
                // Add the category they were leading in and push this player json into array
                player.category = categories[randomCategoryIndex];
                player.categoryValue = playerObj.value;
                restOfPlayersArr.push(player);
              }
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

      // contains the newly generated players.
      console.log(restOfPlayersArr);
    }
  }

  // makes a http request using nba.js data api. Returns a promise with the team leaders data.
  teamLeadersRequest(year, team) {
    return new Promise((resolve, reject) => {
      data.teamLeaders(
        {
          year: year,
          teamName: team,
        },
        (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          // we only want to get the data that we care about from the json.
          let standardStats = res.league.standard;
          resolve(standardStats);
        }
      );
    });
  }

  render() {
    const players = this.props.draftBoard;
    const toggle = this.state.toggle;

    let parsedCards = [];

    // Creates the image card here. Use a loop to place all cards in an array.
    if (players.length > 0) {
      for (let i = 0; i < players.length; i++) {
        const stats = players[i].lastSeason;

        parsedCards.push(
          <Card py={10} key={players[i].name + i} width={256}>
            <Image
              variant="avatar"
              sx={{
                width: ["48%", "48%"],
                borderRadius: 8,
              }}
              src={players[i].img}
            />{" "}
            <Text fontSize={[1]} color="primary">
              {" "}
              {players[i].name}{" "}
            </Text>{" "}
            <Text fontSize={[1]}>
              Points: {stats.ppg}
              Assists: {stats.apg}{" "}
            </Text>{" "}
          </Card>
        );
      }
    }

    return (
      <React.Fragment>
        <Box> {toggle ? "" : parsedCards} </Box>{" "}
        <Box mt={10}>
          <Switch
            mt={2}
            id="switchEnabled"
            type="switch"
            checked={this.state.toggle}
            onClick={this.handleToggle}
          ></Switch>{" "}
          <Text fontSize={[1]}> {toggle ? "Toggle On" : "Toggle Off"} </Text>{" "}
        </Box>{" "}
        <Button onClick={() => this.buildTeam()}> Create Team </Button>{" "}
      </React.Fragment>
    );
  }
}

export default DraftBoard;
