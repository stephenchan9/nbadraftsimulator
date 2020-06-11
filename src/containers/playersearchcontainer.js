import { connect } from "react-redux";
import PlayerSearch from "../components/playersearch.js";
import { addToBoard, removeFromBoard } from "../actions/draftboardactions.js";

const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPlayer: (info) => dispatch(addToBoard(info)),
    removePlayer: (name) => dispatch(removeFromBoard(name)),
  };
};

const PlayerSearchContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);
export default PlayerSearchContainer;
