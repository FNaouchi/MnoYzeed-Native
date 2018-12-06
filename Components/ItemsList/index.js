import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import HeaderButton from "./headerButton";
import * as actionCreators from "../../store/actions/authActions";
import { fetchItemDetail } from "../../store/actions/category";
import moment from "moment";
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

  getRemainingTime(dateTime, name) {
    const deadline = moment(dateTime);
    const today = moment(new Date());
    const difference = deadline.diff(today);

    if (difference <= 0) return "Finished";
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
