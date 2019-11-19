import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { themeStyles } from "../../../../theme";

import DrawerItem from "./components/DrawerItem/DrawerItem";

class Drawers extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    color: PropTypes.shape({}).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      openDrawer: null
    };
  }

  onDrawerOpen = index =>
    this.setState(state => {
      return {
        openDrawer: index === state.openDrawer ? null : index
      };
    });

  render() {
    const { data, color } = this.props;

    return (
      <div style={{ ...styles.container, ...themeStyles.inverted }}>
        {data.map((item, index) => (
          <DrawerItem
            key={index}
            item={item}
            color={color}
            onOpen={() => this.onDrawerOpen(index)}
            open={this.state.openDrawer === index}
          />
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 0.8,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  }
};

const mapStateToProps = ({ canvas }) => ({
  color: canvas.present.global.color
});

export default connect(mapStateToProps)(Drawers);
