import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import {
  List,
  ListItem,
  Card,
  CardItem,
  Button,
  Text,
  Left,
  Content,
  Icon
} from "native-base";
class HeaderButton extends Component {
  render() {
    if (!this.props.user) {
      return (
        <Button
          light
          transparent
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>
            Login{" "}
            <Icon
              type="MaterialCommunityIcons"
              name="login"
              style={{ color: "white", fontSize: 15 }}
            />
          </Text>
        </Button>
      );
    } else {
      return (
        <Button light transparent onPress={() => this.props.logout()}>
          <Text>
            Logout{" "}
            <Icon
              type="MaterialCommunityIcons"
              name="logout"
              style={{ color: "white", fontSize: 15 }}
            />
          </Text>
        </Button>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    category: state.cat.items,
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapActionsToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(HeaderButton);
