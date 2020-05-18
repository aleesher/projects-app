import { createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./../AuthNavigator";
import HomeNavigator from "./../HomeNavigator";

const AppNavigator = createSwitchNavigator(
  {
    AuthNavigator,
    HomeNavigator
  },
  {
    initialRouteName: "AuthNavigator"
  }
);

export default AppNavigator;
