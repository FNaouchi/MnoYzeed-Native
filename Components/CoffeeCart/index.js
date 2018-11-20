import React, { Component } from "react";
import { connect } from "react-redux";

// NativeBase Components
import {
  Text,
  Left,
  Body,
  Right,
  List,
  Button,
  ListItem,
  Icon
} from "native-base";

// Actions
import {
  removeItemFromCart,
  checkoutCart
} from "../../store/actions/cartActions";

class CoffeeCart extends Component {
  handleCheckout() {
    this.props.checkoutCart();
  }

  handleRemove(item) {
    this.props.removeItemFromCart(item);
  }

  componentDidMount() {
    console.log(this.props.user);
    if (!this.props.user) {
      this.props.navigation.replace("Login");
    }
  }
  renderItem(item, index) {
    return (
      <ListItem key={index}>
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}> {item.drink} </Text>
          <Text note style={{ marginLeft: 16 }}>
            {item.option}
          </Text>
        </Left>
        <Body>
          <Text style={{ color: "white" }}>{item.quantity}</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => this.handleRemove(item)}>
            <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { list } = this.props.cart;
    return (
      <List>
        {list.map((item, index) => this.renderItem(item, index))}
        <Button full danger onPress={() => this.handleCheckout()}>
          <Text>Checkout</Text>
        </Button>
      </List>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth.user
});

const mapActionsToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItemFromCart(item)),
  checkoutCart: () => dispatch(checkoutCart())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CoffeeCart);
