import React from "react";
import { Image, Text } from "rebass";
import { Button, Card } from "rebass";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    // Bind the function to give access to props.
    this.addToBoard = this.addToBoard.bind(this);
    this.removeFromBoard = this.removeFromBoard.bind(this);

  }

  addToBoard(event) {
    event.preventDefault();
    const draftBoard = this.props.draftBoard;
    let alreadyExists = false;

    for (let i = 0; i < draftBoard.length; i++) {
      if (draftBoard[i].name === this.props.name) {
        alreadyExists = true;
      }
    }

    // Call the dispatch function to add to the player if not already in the board.
    if (!alreadyExists) {
      this.props.addPlayer(this.props.img, this.props.name);
    }
  }

  removeFromBoard(event) {
    event.preventDefault();
    const draftBoard = this.props.draftBoard;

    // Call the dispatch function to remove the player if not already in the board.
    this.props.removePlayer(this.props.name);
  }

  render() {
    const img = this.props.img;
    const name = this.props.name;

    return (
      <React.Fragment>
        <Card>
          <Image src={img} />
          <Text>{name}</Text>
          <Button onClick={this.addToBoard}>Add Player</Button>
          <Button onClick={this.removeFromBoard}>Remove Player</Button>
          {/* conditional rendering */}
          {/* {this.state.alreadyOnBoard ? (
            <Text color="red">
              Player is already in your board! Please enter a different player
            </Text>
          ) : (
            ""
          )} */}
        </Card>
      </React.Fragment>
    );
  }
}

export default ImageCard;
