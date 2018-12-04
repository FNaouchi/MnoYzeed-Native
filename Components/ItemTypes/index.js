import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import HeaderButton from "../ItemsList/headerButton";
// NativeBase Components
import {
  Text,
  Button,
  Left,
  Icon,
  List,
  ListItem,
  Content,
  Card,
  CardItem
} from "native-base";

// Style
import styles from "./styles";

class CoffeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
    headerRight: <HeaderButton navigation={navigation} />
  });

  handlePress(item, categoryId) {
    this.props.navigation.navigate("ItemsList", {
      typeId: item.id,
      categoryId: categoryId
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.forceUpdate();
    }
  }
  renderItem(item, categoryId) {
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
          onPress={() => this.handlePress(item, categoryId)}
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
    let categoryId = this.props.navigation.getParam("categoryId");
    let itemTypes;
    let ListItems;

    if (this.props.category) {
      itemTypes = this.props.category.find(category => {
        if (category.id === categoryId) {
          return category;
        }
      });
      if (itemTypes) {
        ListItems = itemTypes.item_types.map(item =>
          this.renderItem(item, categoryId)
        );
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

const mapActionsToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CoffeeDetail);
