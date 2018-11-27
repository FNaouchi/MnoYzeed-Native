import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// NativeBase Components
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Picker,
  Content,
  Card,
  CardItem
} from "native-base";

// Style
import styles from "./styles";

// Actions
import { addItemToCart } from "../../store/actions/cartActions";
import { quantityCounter } from "../../utilities/quantityCounter";

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
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
  });

  handlePress(item) {
    this.props.navigation.navigate("ItemsList", {
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
    let ItemsList = this.props.navigation.getParam("item", {});
    let ListItems;
    if (ItemsList) {
      ListItems = ItemsList.items.map(item => this.renderItem(item));
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

const mapStateToProps = state => ({
  cart: state.cart,
  quantity: quantityCounter(state.cart.list)
});

const mapActionsToProps = dispatch => ({
  addItemToCart: (item, cart) => dispatch(addItemToCart(item, cart))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemsList);
