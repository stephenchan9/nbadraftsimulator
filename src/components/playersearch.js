import React from "react";
import { Box, Image, Text, Card, Flex } from "rebass";
// import { Button } from "rebass";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
//import Box from "@material-ui/core/Box";

// child component of the playersearch box
import Suggestions from "./suggestions";
const players = require("../db/playersuggestion.json");

// import nba from "nba-api-client";
const nba = require("nba-api-client");
const data = require("nba.js").data; // Data from nba.data.net

class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);

    // define the initial state with empty fields.
    this.state = {
      name: "",
      img: null,
      playerId: null,
      careerSummary: {
        ppg: "",
        gamesPlayed: "",
      },
      lastSeason: {
        ppg: "",
        apg: "",
      },
      draftBoard: [],
    };

    // Bind the function to give access to props.
    this.addToBoard = this.addToBoard.bind(this);
    this.removeFromBoard = this.removeFromBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerDetails = this.getPlayerDetails.bind(this);
    this.suggestionClick = this.suggestionClick.bind(this);
    this.retrievePlayerProfile = this.retrievePlayerProfile.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  getPlayerDetails() {
    // nba-api-client
    const player = nba.getPlayerID(this.state.name);

    if (player) {
      const playerId = player.PlayerID;
      const teamId = player.TeamID;

      // set the playerId, personId, teamId to the state so it can be used in other functions
      this.setState({ playerId: playerId });
      this.setState({ teamId: teamId });

      // nba api-client
      const params = {
        PlayerID: playerId,
        TeamID: teamId,
      };
      // Get the player headshot and set it to the state.
      const img = nba.getPlayerHeadshotURL(params);
      this.setState({ img: img });

      // dataParams for requesting data from nba.js data client. Different then nba api-client.
      const dataParams = {
        personId: playerId,
        year: 2019,
      };

      // call our function that will make an http request to retrieve player stats using nba.js data api
      this.retrievePlayerProfile(dataParams)
        .then((result) => {
          console.log(`Result from retrievePlayerProfile: ${result}`);

          this.setState({ careerSummary: result.careerSummary }); // Assign the stats here to use whenever in the state of the component.
          this.setState({ lastSeason: result.latest }); // Assign the stats here to use whenever in the state of the component.
        })
        .catch((err) => {
          console.err(err);
        });
    }
  }

  // makes an http request and returns a promise based on if succeeding or not.
  retrievePlayerProfile(params) {
    return new Promise((resolve, reject) => {
      data.playerProfile(params, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const stats = res.league.standard.stats;
        console.log(stats);

        resolve(stats);
      });
    });
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
      // pass in just 1 param that will contain all the player info
      // we clone the state into the variable and remove draftBoard key since its not needed.
      let cloneOfState = this.state;
      delete cloneOfState.draftBoard;

      this.props.addPlayer(cloneOfState);
    }
  }

  removeFromBoard(event) {
    event.preventDefault();

    // Call the dispatch function to remove the player if not already in the board.
    this.props.removePlayer(this.state.name);
  }

  suggestionClick(player) {
    // Update the player input box with the button clicked. Then we can start the query for getPlayerDetails.
    // Place the getPlayerDetails function in a callback because setState is Async.
    this.setState({ name: player }, () => {
      this.getPlayerDetails();
    });
  }

  render() {
    const img = this.state.img;
    const name = this.state.name;
    const lastSeasonStats =
      "" ||
      `Points: ${this.state.lastSeason.ppg}, Apg: ${this.state.lastSeason.apg} Year: ${this.state.lastSeason.seasonYear}`;

    return (
      <React.Fragment>
        <Flex>
          {/* ------Player Search Box: Parent Component */}
          <Box mr={10} width={[1 / 2, 1 / 2, 1 / 2]}>
            <form noValidate autoComplete="off">
              <TextField id="standard-basic" label="Enter a Player" onChange={this.handleChange} value={this.state.name} />
            </form>
            <Button
              type="submit"
              value="submit"
              variant="contained"
              color="primary"
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
                <Text color="primary">{lastSeasonStats}</Text>
                <Button
                  onClick={this.addToBoard}
                  variant="contained"
                  color="primary"
                >
                  Add Player
                </Button>
                <Button
                  onClick={this.removeFromBoard}
                  variant="contained"
                  color="secondary"
                >
                  Remove Player
                </Button>
              </Card>
            ) : (
              <Card />
            )}
          </Box>
          {/* ------Suggestions: Child Component */}
          <Box ml={10} width={[0.1, 0.1, 0.3]}>
            <Suggestions
              players={players}
              suggestionClick={this.suggestionClick}
            />
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

export default PlayerSearch;

PlayerSearch.propTypes = {
  draftBoard: PropTypes.array.isRequired,
  addPlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};
