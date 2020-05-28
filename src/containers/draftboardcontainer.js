import { connect } from "react-redux";
// import { addToBoard, removeFromBoard } from "../actions/draftboardactions.js"
import DraftBoard from "../components/draftboard.js";

const mapStateToProps = (state, ownProps) => {
  return state;
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     toggleAll: (img, name) => dispatch(addToBoard(img, name)),
//     toggleNone: (name) => dispatch(removeFromBoard(name))
//   };
// };

const DraftBoardContainer = connect(mapStateToProps)(DraftBoard);
export default DraftBoardContainer;
