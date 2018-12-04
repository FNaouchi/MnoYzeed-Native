import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import HeaderButton from "../ItemsList/headerButton";
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
      user: ""
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
            this.state
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
    let date = new Date();
    let current_year = date.getFullYear(),
      current_month = date.getMonth() + 1,
      current_day = date.getDate(),
      current_hour = date.getHours(),
      current_min = date.getMinutes(),
      current_sec = date.getSeconds();

    if (dateTime) {
      let year = parseInt(dateTime.slice(0, 4), 10);
      let month = parseInt(dateTime.slice(5, 7), 10);
      let day = parseInt(dateTime.slice(8, 10), 10);
      let hour = parseInt(dateTime.slice(11, 13), 10);
      let min = parseInt(dateTime.slice(14, 16), 10);

      let year_difference = year - current_year;
      let month_difference = month - current_month;
      let day_difference = day - current_day;
      let hour_difference = 23 - current_hour;
      let min_difference = 60 - current_min;
      let sec_difference = 60 - current_sec;

      if (year_difference > 0) {
        return (
          year_difference +
          " years, " +
          month_difference +
          " months, " +
          "and " +
          day_difference +
          " days."
        );
      } else {
        if (month_difference > 1) {
          return (
            month_difference + " months " + "and " + day_difference + " days."
          );
        } else {
          if (month_difference === 1) {
            return day_difference + " days.";
          } else {
            if (day_difference > 1) {
              return (
                day_difference +
                " days, " +
                hour_difference +
                "h ,and " +
                min_difference +
                "min."
              );
            } else {
              if (day_difference === 1) {
                return hour_difference + "h ,and " + min_difference + "min.";
              } else {
                if (hour - current_hour > 1) {
                  return (
                    hour -
                    current_hour +
                    "h," +
                    min_difference +
                    "min, and " +
                    sec_difference +
                    "sec"
                  );
                } else {
                  if (hour - current_hour === 1) {
                    return (
                      min_difference + "min, and " + sec_difference + "sec"
                    );
                  } else {
                    if (min - current_min > 1) {
                      return (
                        min -
                        current_min -
                        1 +
                        "min and " +
                        sec_difference +
                        "sec"
                      );
                    } else {
                      // show seconds only
                      if (min - current_min === 1) {
                        return sec_difference + "sec";
                      } else {
                        if (this.state.z === 0) {
                          this.setState({ bidding: false });
                        }
                        this.state.z = this.state.z + 1;
                        return name + " won the auction";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  biddeName(item, name) {
    if (item.biddings && item.biddings.length) {
      return "by " + name;
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
        <Button full success onPress={() => this.handelBidding(highestBid)}>
          <Text>Bid</Text>
        </Button>
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
