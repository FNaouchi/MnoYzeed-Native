import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "native-base";
// Components
import CategoryList from "../CategoryList";
import ItemTypes from "../ItemTypes";
import ItemsList from "../ItemsList";
import ItemDetail from "../ItemDetail";
import Login from "../Login";
import Signup from "../Signup";

const HomeStack = createStackNavigator(
  {
    CategoryList: CategoryList,
    ItemsList: ItemsList,
    ItemTypes: ItemTypes,
    ItemDetail: ItemDetail,
    Login: Login,
    Signup: Signup
  },
  {
    initialRouteName: "CategoryList",
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
      backgroundColor: "#28292F"
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: Login
  },
  {
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
      backgroundColor: "#28292F"
    }
  }
);
const NewsStack = createStackNavigator(
  {
    Search: Login
  },
  {
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
      backgroundColor: "#28292F"
    }
  }
);
const ProfileStack = createStackNavigator(
  {
    Search: Login
  },
  {
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
      backgroundColor: "#28292F"
    }
  }
);

const BottomTab = createBottomTabNavigator(
  {
    HomeTab: HomeStack,
    SearchTab: SearchStack,
    NewsTab: NewsStack,
    ProfileTab: ProfileStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "HomeTab") {
          iconName = "home";
          iconType = "Feather";
        } else if (routeName === "SearchTab") {
          iconName = "search";
          iconType = "Feather";
        } else if (routeName === "NewsTab") {
          iconName = "ios-notifications-outline";
          iconType = "Ionicons";
        } else if (routeName === "ProfileTab") {
          iconName = "user";
          iconType = "Feather";
        }
        return (
          <Icon name={iconName} style={{ color: tintColor }} type={iconType} />
        );
      }
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "grey",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "black"
      }
    }
  }
);

export default BottomTab;
