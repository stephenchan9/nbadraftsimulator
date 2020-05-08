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
    this.renderDraftBoard = this.renderDraftBoard.bind(this);
  }

  // called when the component is rendered
  componentDidMount() {
    console.log("Finished Mounting Homepage");
  }

  renderDraftBoard(players) {
    console.log("rendred the image cards");
    this.setState({ players: players });
  }

  render() {
    const name = this.props.config.name;
    const players = this.state.players;

    return (
      <React.Fragment>
        <Flex>
          <Box p={3} width={0.2} bg="secondary">
            {/* <Heading fontSize={[2]}>Draft Board</Heading> */}
            <DraftBoardContainer players={players} />
          </Box>
          <Box p={3} width={1 / 2} bg="secondary">
            <Heading>Welcome, {name}</Heading>
            <PlayerSearchContainer config={this.props.config} />
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

export default Homepage;
