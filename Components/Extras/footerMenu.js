import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge
} from "native-base";

class FooterMenu extends Component {
  render() {
    return (
      <Footer style={{ flex: 0.1 }}>
        <FooterTab style={{ backgroundColor: "#000000" }}>
          <Button
            vertical
            style={{ marginBottom: 10 }}
            onPress={() => this.props.Navigation.navigate("ItemsList")}
          >
            <Icon type="Feather" name="home" />
            <Text>Home</Text>
          </Button>
          <Button vertical style={{ marginBottom: 10 }}>
            <Icon type="Feather" name="search" />
            <Text>Search</Text>
          </Button>
          <Button badge vertical style={{ marginBottom: 10 }}>
            <Badge>
              <Text>51</Text>
            </Badge>
            <Icon type="Ionicons" name="ios-notifications-outline" />
            <Text>News</Text>
          </Button>
          <Button vertical style={{ marginBottom: 10 }}>
            <Icon type="Feather" name="user" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterMenu;
