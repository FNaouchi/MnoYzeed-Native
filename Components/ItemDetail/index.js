import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View } from "react-native";
import HeaderButton from "../ItemsList/headerButton";

import moment from "moment";

import * as actionCreators from "../../store/actions/authActions";
import * as actionDetail from "../../store/actions/category";
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
  Form,
  Label,
  Item,
  Input,
  Card,
  CardItem,
  Container
} from "native-base";

// Style
import styles from "./styles";

// Actions

class ItemsList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
    headerRight: <HeaderButton navigation={navigation} />
  });
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      user: "",
      bidding: true,
      z: 0
    };
    this.handelBidding = this.handelBidding.bind(this);
  }
  handelBidding(highestBid) {
    if (this.props.user) {
      text = this.state.amount;
      let number;
      if (text.match("^[0-9]*$")) {
        number = parseInt(text, 10);
        if (number <= parseInt(highestBid, 10))
          alert("The value must be greater than " + highestBid);
        else {
          this.setState({ user: this.props.user.username });
          this.props.postBiddings(
            this.props.navigation.getParam("item", {}).id,
            { amount: this.state.amount, user: this.state.user }
          );
          this.setState({ amount: "" });
        }
      } else {
        alert("Please Enter integer value only");
      }
    } else alert("Please Login before making a bid");
  }
  componentDidMount() {
    let item = this.props.navigation.getParam("item", {});
    this.props.fetchItemDetail(item.id);
    this.interval = setInterval(
      () => this.props.fetchItemDetail(item.id),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRemainingTime(dateTime, name) {
    const deadline = moment(dateTime);
    const today = moment(new Date());
    const difference = deadline.diff(today);

    if (difference <= 0) return name + " won the auction";
    else {
      const duration = moment.duration(difference);
      const units = ["years", "months", "days", "hours", "minutes", "seconds"];

      return units.reduce((timeRemaining, unit) => {
        if (duration[unit]() > 0) {
          return timeRemaining + `${duration[unit]()} ${unit} `;
        }
        return timeRemaining;
      }, "");
    }
  }
  biddeName(item, name) {
    if (item.biddings && item.biddings.length) {
      return "by " + name;
    }
  }

  auctionStatus(item, name) {
    const bidding = !this.getRemainingTime(item.end_date, name).includes(name);
    if (bidding) {
      return (
        <Content>
          <Form>
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
                keyboardType={"numeric"}
                name="Bidding"
                value={this.state.amount}
                onChangeText={value => this.setState({ amount: value })}
              />
            </Item>
          </Form>
          <Button
            full
            success
            onPress={() => this.handelBidding(item.highest_bid)}
            style={{ borderRadius: 20 }}
          >
            <Text>Bid</Text>
          </Button>
        </Content>
      );
    } else {
      return "";
    }
  }

  renderItem(item, highestBid, name) {
    return (
      <Content>
        <Content>
          <ImageBackground
            source={{ uri: item.logo }}
            key={item.id}
            style={styles.background}
          />
        </Content>
        <View />
        <Text style={styles.text}>
          {item.name} {"\n"}
          {"\n"}
          {item.description}
          {"\n"}
          {"\n"}
          {highestBid} KD {this.biddeName(item, name)}
          {"\n"}
          {"\n"}
          {this.getRemainingTime(item.end_date, name)}
        </Text>
        {this.auctionStatus(item, name)}
      </Content>
    );
  }
  render() {
    let itemDetail;
    if (this.props.item) {
      let amount = this.props.item.starting_price;
      let name;
      let price = this.props.item.starting_price;
      let bidder;
      let highestBid = parseInt(this.props.item.starting_price, 10);

      if (this.props.item.biddings && this.props.item.biddings.length) {
        bidder = this.props.item.biddings.map(bid =>
          parseInt(price, 10) < parseInt(bid.amount, 10) ? bid : bidder
        );
        amount = bidder.map(bid => {
          if (parseInt(highestBid, 10) < parseInt(bid.amount, 10)) {
            (highestBid = bid.amount), (name = bid.user);
          }
        });
      }
      itemDetail = this.renderItem(this.props.item, highestBid, name);
    }
    return (
      <Content>
        <List>{itemDetail}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  item: state.cat.item,
  beddings: state.cat.beddings,
  loading: state.cat.loading,
  user: state.auth.user
});

const mapActionsToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout()),
  postBiddings: (itemId, bid) =>
    dispatch(actionDetail.postBiddings(itemId, bid)),
  fetchItemDetail: itemId => dispatch(actionDetail.fetchItemDetail(itemId))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemsList);
