import { connect } from "react-redux";
// import { buildRemainingTeam } from "../actions/draftboardactions.js"
import DraftBoard from "../components/draftboard/draftboard.js";

const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // return {
  //   buildRemainingTeam: (players) => dispatch(buildRemainingTeam(players))
  // };
};

const DraftBoardContainer = connect(mapStateToProps, mapDispatchToProps)(DraftBoard);
export default DraftBoardContainer;
