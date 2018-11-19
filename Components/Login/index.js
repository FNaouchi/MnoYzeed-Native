import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";

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
  Header
} from "native-base";

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handelLogin() {
    this.props.login(this.state, this.props.navigation);
  }
  handelSignup() {
    this.props.signup(this.state, this.props.navigation);
    console.log(this.state);
  }
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    name="username"
                    onChangeText={value => this.setState({ username: value })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    name="password"
                    onChangeText={value => this.setState({ password: value })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button full success onPress={() => this.handelLogin()}>
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={() => this.handelSignup()}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, navigation) =>
      dispatch(actionCreators.registerUser(userData, navigation)),
    login: (userData, navigation) =>
      dispatch(actionCreators.loginUser(userData, navigation))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
