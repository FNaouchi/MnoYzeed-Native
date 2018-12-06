import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/Profile";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header,
  Icon,
  Thumbnail,
  View
} from "native-base";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile"
    };
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.forceUpdate();
    }
  }
  createProfile() {
    if (this.props.user) {
      return (
        <Content>
          <Text>
            {"\n"}
            {"\n"}
          </Text>
          <Body>
            <Thumbnail
              source={{ uri: this.props.profile.profile.profile_picture }}
              style={{
                width: 150,
                height: 150
              }}
            />
          </Body>
          <Text style={{ color: "white", textAlign: "center", fontSize: 25 }}>
            {"\n"}
            {this.props.user.username}
            {"\n"}
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 21 }}>
            {this.props.profile.profile.bio}
            {"\n"}
            {"\n"}
          </Text>
        </Content>
      );
    } else {
      return (
        <Content>
          <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            Login first to view your profile
            {"\n"}
            {"\n"}
          </Text>

          <Button
            full
            success
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </Button>
        </Content>
      );
    }
  }

  render() {
    return <Content>{this.createProfile()}</Content>;
  }
}

const mapStateToProps = state => ({
  profile: state.pro.profile,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
