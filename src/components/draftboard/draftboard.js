/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import DraftBoardSuggested from "./draftboardsuggested";
import PlayerImageCard from "../../material-assets/playerimagecard";

// Data from nba.data.net
const data = require("nba.js").data;
const nba = require("nba-api-client");
const playersDB = require("../../db/players.json");
const teams = require("../../db/teams.json");
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

  // Async function that builds the rest of the players using information from the draftboard.
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
        // retrieve all of the keys for the teams.json and select a random key.
        let teamKeys = Object.keys(teams);
        // we grab a random team and category query for their team leaders
        let randTeamIndex = Math.floor(
          Math.random() * Math.floor(teamKeys.length - 1)
        );
        let randomCategoryIndex = Math.floor(
          Math.random() * Math.floor(categories.length - 1)
        );
        let randomTeam = teams[teamKeys[randTeamIndex]];

        this.teamLeadersRequest(2019, randomTeam.TeamName.toLowerCase())
          .then((result) => {
            console.log(result);

            let playerObj = result[categories[randomCategoryIndex]][0];

            // now we need to search our players.json for the player and team name
            for (let player of playersDB) {
              if (player.playerId === parseInt(playerObj.personId)) {
                // Add the following information for the player obj
                // 1. leading category
                // 2. category val
                // 3. headshot img.
                player.category = categories[randomCategoryIndex];
                player.categoryValue = playerObj.value;
                player.img = nba.getPlayerHeadshotURL({
                  PlayerID: player.playerId,
                  TeamID: player.teamId,
                });
                restOfPlayersArr.push(player);
              }
            }

            // instead we want to show this to the
            if (restOfPlayersArr.length === remainingPlayerCount) {
              console.log(restOfPlayersArr);
              //this.props.buildRemainingTeam(restOfPlayersArr);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
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

        // pass in props to the card component in material assets ui.
        let playerObj = {
          stats,
          img: players[i].img,
          name: players[i].name,
        };

        parsedCards.push(<PlayerImageCard player={playerObj} />);
      }
    }

    return (
      <React.Fragment>
        <Box> {toggle ? "" : parsedCards} </Box>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.toggle}
                onClick={this.handleToggle}
                color="primary"
              />
            }
            label={toggle ? "On" : "Off"}
            labelPlacement="start"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.buildTeam()}
        >
          Create Team
        </Button>
      </React.Fragment>
    );
  }
}

export default DraftBoard;

DraftBoard.propTypes = {
  draftBoard: PropTypes.array,
};
