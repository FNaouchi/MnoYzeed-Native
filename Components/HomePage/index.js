import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Actions
import { fetchItems } from "../../store/actions/category";

// Navigation
import Nav from "../Navigation";

class HomePage extends Component {
  componentDidMount() {
    if (!this.props.category) this.props.fetchCategory();
  }

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  category: state.cat.category
});

const mapActionsToProps = dispatch => ({
  fetchCategory: () => dispatch(fetchItems())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
