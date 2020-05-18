import { createStackNavigator } from "react-navigation";

import { Login } from "screens/.";

const AuthNavigator = createStackNavigator(
  {
    Login
  },
  {
    headerMode: "none",
    cardStyle: { opacity: 1 }
  }
);

export default AuthNavigator;
