import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import HeaderButton from "./headerButton";
import * as actionCreators from "../../store/actions/authActions";
import { fetchItemDetail } from "../../store/actions/category";
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

class ItemsList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
    headerRight: <HeaderButton navigation={navigation} />
  });
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ timer: this.state.timer + 1 }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRemainingTime(dateTime) {
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
                        return "The bidding is finished";
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

  handlePress(item) {
    this.props.navigation.navigate("ItemDetail", {
      item: item
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.forceUpdate();
    }
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
                <Text style={{ color: "white", fontSize: 22 }}>
                  {item.name} {"\n"}
                  {this.getRemainingTime(item.end_date)} {"\n"}
                  {item.highest_bid} KD
                </Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      </ImageBackground>
    );
  }
  render() {
    let itemTypeId = this.props.navigation.getParam("typeId", {});
    let categoryId = this.props.navigation.getParam("categoryId", {});
    let ListItems;
    let itemType;
    let itemCategory;
    if (this.props.category) {
      itemCategory = this.props.category.find(category => {
        if (category.id === categoryId) {
          return category;
        }
      });
      if (itemCategory) {
        itemType = itemCategory.item_types.find(type => {
          if (type.id === itemTypeId) {
            return type;
          }
        });
        if (itemType)
          ListItems = itemType.items.map(item => this.renderItem(item));
      }
    }
    return (
      <Content>
        <List>{ListItems}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  category: state.cat.items
});

const mapActionsToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemsList);
