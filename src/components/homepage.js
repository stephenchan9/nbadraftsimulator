import React from "react";
import { Heading, Flex, Box } from "rebass";
import DraftBoardContainer from "../containers/draftboardcontainer.js";
import PlayerSearchContainer from "../containers/playersearchcontainer.js";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
  }

  // called when the component is rendered
  componentDidMount() {
    console.log("Finished Mounting Homepage");
  }

  render() {
    const name = this.props.name || "User 1";
    const players = this.state.players;

    return (
      <React.Fragment>
        <Flex>
          <Box p={3} width={0.2} bg="secondary">
            <Heading>Draft Board</Heading>
            <DraftBoardContainer players={players} />
          </Box>
          <Box p={3} width={.5} bg="secondary">
            <Heading>Welcome, {name}</Heading>
            <PlayerSearchContainer config={this.props.config} />
          </Box>
          <Box p={1}  bg="secondary">
            <Heading>Player Suggestions</Heading>
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

export default Homepage;
