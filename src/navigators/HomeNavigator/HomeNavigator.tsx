import React from "react";
import { createStackNavigator } from "react-navigation";
import { Animated, Easing, View } from "react-native";
import { ApolloProvider } from "react-apollo";

import ApolloHelper from "dakota-2-portal/src/helpers/apollo";

import {
  Home,
  DetailsModal,
  QualityMeasurement,
  ReportDelivery,
  ProgressReport,
  IncidentReport,
  VisitReport,
  DeviationForm,
  Documents,
  QuestionsAnswers,
  KIMInformation,
  CreateQuestion
} from "screens/.";
import { URL } from "constants/.";

const SlideFromRight = (index: number, position: any, width: number) => {
  const inputRange = [index - 1, index, 100];
  const outputRange = [width, 0, 0];
  const translateX = position.interpolate({
    inputRange,
    outputRange
  });
  const slideFromRight = { transform: [{ translateX }] };

  return slideFromRight;
};

const HomeNavigator = createStackNavigator(
  {
    Home,
    DetailsModal,
    QualityMeasurement,
    ReportDelivery,
    ProgressReport,
    IncidentReport,
    VisitReport,
    DeviationForm,
    Documents,
    QuestionsAnswers,
    KIMInformation,
    CreateQuestion
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    headerMode: "none",
    cardStyle: { opacity: 1 },
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const {
          layout,
          position,
          scene: { index }
        } = sceneProps;
        const width = layout.initWidth;

        return SlideFromRight(index, position, width);
      }
    })
  }
);

class HomeNavigatorClass extends React.Component<any, { apolloClient: any }> {
  static router = HomeNavigator.router;

  state = {
    apolloClient: null
  }

  async componentDidMount() {
    await ApolloHelper.initialize(URL);
    const apolloClient = await ApolloHelper.getClient();

    this.setState({ apolloClient });
  }

  render() {
    const { apolloClient } = this.state;

    if (!apolloClient) {
      return <View style={{ flex: 1, backgroundColor: "white" }} />;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <HomeNavigator navigation={this.props.navigation} />
      </ApolloProvider>
    );
  }
}

export default HomeNavigatorClass;
