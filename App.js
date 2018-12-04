import React from "react";
import Expo, { AppLoading } from "expo";
import { Provider } from "react-redux";
// Store
import store from "./store";
import { StatusBar } from "react-native";
// Actions
import { checkForExpiredToken } from "./store/actions/authActions";
import { fetchItems } from "./store/actions/category";
// Component
import HomePage from "./Components/HomePage";
import { Container } from "native-base";
import FooterMenu from "./Components/Extras/footerMenu";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsAreLoaded: false
    };
  }

  componentDidMount() {}

  componentWillMount() {
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => this.setState({ fontsAreLoaded: true }));
    store.dispatch(checkForExpiredToken());
    store.dispatch(fetchItems());
  }
  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Container>
    );
  }
}

export default App;
