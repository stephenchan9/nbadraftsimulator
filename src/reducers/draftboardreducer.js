import {
  ADD_PLAYER,
  REMOVE_PLAYER,
} from "../actions/draftboardactions.js";
// import { combineReducers } from 'redux'

const initialState = {
  user: "Stephen",
  draftBoard: [],
};

const draftBoard = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        draftBoard: [...state.draftBoard, action.payload],
      };
    case REMOVE_PLAYER: // filter returns an array of all items that satisfy the condition. We want an rray that satisfies the condition.
      const testResult = {
        ...state,
        draftBoard: state.draftBoard.filter(
          (obj) => obj.name !== action.payload.name
        ),
      };
      console.log(testResult);
      return {
        ...state,
        draftBoard: state.draftBoard.filter(
          (obj) => obj.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
};

export default draftBoard;
