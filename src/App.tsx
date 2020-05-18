import React from "react";
import { createAppContainer } from "react-navigation";
import { MenuProvider } from "react-native-popup-menu";
import moment from "moment";
import nl from "moment/locale/nl";

import { Notification, Loader } from "dakota-2-portal/src/components";

import { AppNavigator } from "navigators/.";

moment.locale("nl", nl);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <MenuProvider>
    <Loader>
      <AppContainer />
    </Loader>
    <Notification />
  </MenuProvider>
);