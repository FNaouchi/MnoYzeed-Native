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
  Header,
  Icon
} from "native-base";

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Signup",
      headerRight: (
        <Button light transparent onPress={() => navigation.replace("Login")}>
          <Text>Login</Text>
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: ""
    };
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
                <Body>
                  <Label style={{ color: "white" }}>Email</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    name="email"
                    onChangeText={value => this.setState({ email: value })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>First Name</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    name="First Name"
                    onChangeText={value => this.setState({ firstName: value })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Last Name</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    name="Last Name"
                    onChangeText={value => this.setState({ lastName: value })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
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
      dispatch(actionCreators.registerUser(userData, navigation))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
