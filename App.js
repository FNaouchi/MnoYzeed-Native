import React from "react";
import Expo, { AppLoading } from "expo";
import { Provider } from "react-redux";
// Store
import store from "./store";

// Actions
import { checkForExpiredToken } from "./store/actions/authActions";
import { fetchItems } from "./store/actions/category";
// Component
import HomePage from "./Components/HomePage";

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
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
