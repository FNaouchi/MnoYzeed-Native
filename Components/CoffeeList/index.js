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
  Thumbnail,
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
      title: "Coffee List",
      headerLeft: null,
      headerRight: (
        <Button
          light
          transparent
          onPress={() => navigation.navigate("CoffeeCart")}
        >
          <Text>
            {navigation.getParam("quantity", 0)}
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
      quantity: this.props.quantity
    });
    this.props.navigation.setParams({
      isAuthenticated: this.props.isAuthenticated
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity !== this.props.quantity) {
      this.props.navigation.setParams({
        quantity: this.props.quantity
      });
    }
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.props.navigation.setParams({
        isAuthenticated: this.props.isAuthenticated
      });
    }
  }

  handlePress(shop) {
    this.props.navigation.navigate("CoffeeDetail", {
      shop: shop,
      quantity: this.props.quantity
    });
  }

  renderItem(shop) {
    return (
      <TouchableOpacity key={shop.id} onPress={() => this.handlePress(shop)}>
        <ImageBackground
          source={{ uri: shop.background }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: shop.img }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{shop.name}</Text>
                  <Text note style={styles.text}>
                    {shop.distance}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  render() {
    const { coffeeshops } = this.props.coffee;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(shop => this.renderItem(shop));
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
