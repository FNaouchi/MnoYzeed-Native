import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import HeaderButton from "../ItemsList/headerButton";
import { Container } from "native-base";
import { fetchItems } from "../../store/actions/category";
import * as profileCreators from "../../store/actions/Profile";
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
  Thumbnail
} from "native-base";
// Style
import styles from "./styles";
import zainLogo from "../zain.png";
import mnoYzeed from "../MnoYzeed.png";
class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Categories",
    headerLeft: (
      <Thumbnail square source={zainLogo} style={{ width: 120, height: 60 }} />
    ),
    headerRight: <HeaderButton navigation={navigation} />
  });

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

  handlePress(item) {
    this.props.navigation.navigate("ItemTypes", {
      categoryId: item.id
    });
  }
  componentWillMount() {
    this.interval = setInterval(() => {
      this.props.fetchCategory();
      if (this.props.user) {
        this.props.fetchProfileDetail(this.props.user.user_id);
      }
    }, 7000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
    if (this.props.user) {
      this.props.fetchProfileDetail(this.props.user.user_id);
    }
    if (this.props.category) {
      ListItems = this.props.category.map(item => this.renderItem(item));
    }
    return (
      <Content>
        <List>{ListItems}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    category: state.cat.items,
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapActionsToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout()),
  fetchCategory: () => dispatch(fetchItems()),
  fetchProfileDetail: userId =>
    dispatch(profileCreators.fetchProfileDetail(userId))
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(CoffeeList);
