import React from "react";
import { createStackNavigator } from "react-navigation";

// Components
import CoffeeList from "../CoffeeList";
import CoffeeDetail from "../CoffeeDetail";
import ItemsList from "../ItemsList";
import CoffeeCart from "../CoffeeCart";
import Login from "../Login";
import Signup from "../Signup";

export default createStackNavigator(
  {
    CoffeeList: CoffeeList,
    ItemsList: ItemsList,
    CoffeeDetail: CoffeeDetail,
    CoffeeCart: CoffeeCart,
    Login: Login,
    Signup: Signup
  },
  {
    initialRouteName: "CoffeeList",
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "grey"
    }
  }
);
