import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import placeholder from "../imgs/placeholder.jpg";
// child component of the playersearch box
import Suggestions from "./suggestions";
import PlayerSearchCard from "../material-assets/playersearchcard";
//const process = require('process');
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
      let img = nba.getPlayerHeadshotURL(params);

      // we test the img URL using fetch and see if its valid. If not valid, use a placeholder image and set the state.
      if (img) {
        fetch(img).then((response) => {
          if (response.ok === false) {
            // this means the img is not valid. Use a placeholder image from imgs folder aND SET THE STATE
            img = placeholder;
          }
        });
      }

      this.setState({img: img});

      // dataParams for requesting data from nba.js data client. Different then nba api-client.
      const dataParams = {
        personId: playerId,
        year: 2019,
      };

      // call our function that will make an http request to retrieve player stats using nba.js data api
      this.retrievePlayerProfile(dataParams)
        .then((result) => {
          console.log(`Result from retrievePlayerProfile: ${result}`);
          // Assign the stats here to use whenever in the state of the component.
          this.setState({ careerSummary: result.careerSummary }); 
          this.setState({ lastSeason: result.latest }); 
        })
        .catch((err) => {
          console.error(err);
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
    const name = this.state.name;
    const lastSeasonStats =
      "" ||
      `Points: ${this.state.lastSeason.ppg}, Apg: ${this.state.lastSeason.apg} Year: ${this.state.lastSeason.seasonYear}`;
    const img = this.state.img;

    return (
      <React.Fragment>
        <Grid container direction="row" spacing={4}>
          <Grid item xs={6} id="searchbox-with-button">
            <form noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Enter a Player"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </form>
            <Button
              type="submit"
              size="medium"
              value="submit"
              variant="contained"
              color="primary"
              onClick={() => this.getPlayerDetails()}
            >
              Submit
            </Button>
            {/* Image portion here */}
            {img ? (
              <Grid container id="gr2-image">
                <Grid item>
                  <PlayerSearchCard
                    img={img}
                    name={name}
                    playerBio="Hello"
                    stats={lastSeasonStats}
                  />
                </Grid>
                <Grid
                  item
                  container
                  spacing={1}
                  direction="row"
                  id="add-remove-playerbuttons"
                >
                  <Grid item>
                    <Button
                      onClick={this.addToBoard}
                      variant="contained"
                      color="primary"
                    >
                      Add Player
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.removeFromBoard}
                      variant="contained"
                      color="secondary"
                    >
                      Remove Player
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6} id="suggestions">
            <Suggestions
              suggestionClick={this.suggestionClick}
              players={players}
            />
          </Grid>
        </Grid>
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
