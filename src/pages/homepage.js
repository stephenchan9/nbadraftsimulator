import React from "react";
import PermanentDrawerLeft from "../components/material-assets/drawers/permDrawer.js";
import PropTypes from "prop-types";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  // called when the component is rendered
  componentDidMount() {
    console.log("Finished Mounting Homepage");
  }

  render() {
    const draftBoardProps = {
      players: [],
      heading: `Welcome ${this.props.name || "User 1"}`
    }

    return (
      <React.Fragment>
        <PermanentDrawerLeft draftBoard={draftBoardProps}/>
      </React.Fragment>
    );
  }
}

Homepage.propTypes = {
  name: PropTypes.string,
}

export default Homepage;
