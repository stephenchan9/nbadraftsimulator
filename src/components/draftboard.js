import React from "react";
import { Image, Heading, Card } from "rebass";

// Left side component that will hold all players that were added. 
// This should be reading from the state.
class DraftBoard extends React.Component {
  constructor(props) {
    super(props);

    this.createCards = this.createCards.bind(this);
  }

  createCards(){
    const players = this.props.draftBoard.players;
    let parsedCards = [];

    for(let i =0; i< players.length; i++){
      parsedCards.push(
        <Card width={256}>
          <Image variant='avatar' src={players[i].img} />
          <Heading>{players[i].name}</Heading>
        </Card>
      )
    }

    return parsedCards;
  }

  render() {
    return (
      <React.Fragment>
        {this.createCards}
      </React.Fragment>
    )
  }
}

export default DraftBoard
