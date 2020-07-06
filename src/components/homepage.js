import React from "react";
import { Heading, Flex, Box } from "rebass";
import DraftBoardContainer from "../containers/draftboardcontainer.js";
import PlayerSearchContainer from "../containers/playersearchcontainer.js";
import PermanentDrawerLeft from "../components/material-assets/drawers/permDrawer.js";

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

    const draftBoardProps = {
      players: this.props.players,
      heading: "Draft Board"
    }

    return (
      <React.Fragment>
        <PermanentDrawerLeft draftBoard={draftBoardProps} heading={`Welcome ${name}`}/>
          <Flex>
            <Box p={3} width={0.2} bg="secondary">
              <Heading>Draft Board</Heading>
              <DraftBoardContainer players={players} />
            </Box>
            <Box p={3} width={0.4} bg="secondary">
              <Heading>Welcome, {name}</Heading>
              <PlayerSearchContainer config={this.props.config} />
            </Box>
          </Flex>
      </React.Fragment>
    );
  }
}

export default Homepage;
