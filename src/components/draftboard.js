import React from "react";
import { Box, Image, Text, Card } from "rebass";
import { Switch } from "@rebass/forms";

// Left side component of the homepage that will hold all players that were added on the draft board.
// This should be reading from the state.
class DraftBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  // Function will toggle all players in draftboard to visible.
  handleToggle() {
    this.setState({toggle: !this.state.toggle});
  }

  render() {
    const players = this.props.draftBoard;
    const toggle = this.state.toggle;
    
    let parsedCards = [];

    // Creates the image card here. Use a loop to place all cards in an array.
    if (players.length > 0) {

      for (let i = 0; i < players.length; i++) {
        const stats = players[i].stats;

        parsedCards.push(
          <Card py={10} key={players[i].name + i} width={256}>
            <Image
              variant="avatar"
              sx={{
                width: ["48%", "48%"],
                borderRadius: 8,
              }}
              src={players[i].img}
            />
            <Text fontSize={[1]} color="primary">
              {players[i].name}
            </Text>
            <Text fontSize={[1]}>
              Points: {stats.ppg} Assists: {stats.apg}
            </Text>
          </Card>
        );
      }
    }

    return (
      <React.Fragment>
        <Box>{toggle ? "" : parsedCards}</Box>
        <Box mt= {10}>
          <Switch mt={2}
            id="switchEnabled"
            type="switch"
            checked={this.state.toggle}
            onClick={this.handleToggle}
          ></Switch>
          <Text fontSize={[1]}>{toggle ? "Toggle On": "Toggle Off"}</Text>
        </Box>
      </React.Fragment>
    );
  }
}

export default DraftBoard;
