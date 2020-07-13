import { connect } from "react-redux";
import DraftBoard from "../components/draftboard/draftboard.js";

const mapStateToProps = (state) => {
  return state;
};

const DraftBoardContainer = connect(mapStateToProps)(DraftBoard);
export default DraftBoardContainer;
