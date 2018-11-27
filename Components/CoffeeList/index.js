import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
// NativeBase Components
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

// Style
import styles from "./styles";

// Actions
import { quantityCounter } from "../../utilities/quantityCounter";

class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Categories",
      headerLeft: null,
      headerRight: (
        <Button
          light
          transparent
          onPress={() => navigation.navigate("CoffeeCart")}
        >
          <Text>
            <Icon
              type="FontAwesome"
              name="coffee"
              style={{ color: "white", fontSize: 15 }}
            />
          </Text>
        </Button>
      )
    };
  };

  componenDidMount() {
    this.props.navigation.setParams({
      isAuthenticated: this.props.isAuthenticated
    });
    if (this.props.isAuthenticated) {
      this.props.navigation.setParams({
        type: "FontAwesome",
        name: "coffee",
        screen: "CoffeeCart"
      });
    }
  }

  componentDidUpdate(prevProps) {}

  handlePress(item) {
    this.props.navigation.navigate("CoffeeDetail", {
      item: item
    });
  }

  renderItem(item) {
    return (
      <ImageBackground
        source={{ uri: item.logo }}
        key={item.id}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <ListItem
          style={styles.listitem}
          button
          onPress={() => this.handlePress(item)}
        >
          <Card style={styles.transparent}>
            <CardItem style={styles.transparent}>
              <Left>
                <Text style={{ color: "white", fontSize: 25 }}>
                  {item.name}
                </Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      </ImageBackground>
    );
  }
  render() {
    let ListItems;
    if (this.props.category) {
      ListItems = this.props.category.map(item => this.renderItem(item));
    }
    return (
      <Content>
        <List>{ListItems}</List>
        {this.props.user ? (
          <Button
            light
            onPress={() => this.props.logout()}
            style={{
              marginLeft: 140,
              backgroundColor: "green",
              marginTop: 50
            }}
            className="btn"
          >
            <Text style={{ color: "white" }}>
              Logout
              <Icon
                type="MaterialCommunityIcons"
                name="logout"
                style={{ color: "white", fontSize: 15 }}
              />
            </Text>
          </Button>
        ) : (
          <Button
            light
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              marginLeft: 140,
              backgroundColor: "green",
              marginTop: 50
            }}
            className="btn"
          >
            <Text style={{ color: "white" }}>
              Login
              <Icon
                type="MaterialCommunityIcons"
                name="login"
                style={{ color: "white", fontSize: 15 }}
              />
            </Text>
          </Button>
        )}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.coffee,
    user: state.auth.user,
    category: state.cat.items,
    isAuthenticated: state.auth.isAuthenticated,
    quantity: quantityCounter(state.cart.list)
  };
};
const mapActionsToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(CoffeeList);
