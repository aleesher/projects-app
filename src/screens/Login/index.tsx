import React from "react";
import { View } from "react-native";

import authHelpers from "dakota-2-portal/src/helpers/authHelpers";
import { LoginForm } from "dakota-2-portal/src/components";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";
import ApolloHelper from "dakota-2-portal/src/helpers/apollo";

import * as Styles from "./styles";
import { LOGIN_MUTATION } from "./graphql";
import { URL } from "constants/.";

// @ts-ignore
import img from "./../../../assets/images/builder.png";

interface IProps {
  navigation: any;
}

interface IState {
  loginIsChecked: boolean;
}

class Login extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.checkLogin();

    this.state = {
      loginIsChecked: false
    }
  }

  checkLogin = async () => {
    const token = await authHelpers.getToken();

    if (token) {
      this.props.navigation.navigate("Home");
    }

    this.setState({ loginIsChecked: true });
  }

  handleLogin = async (values, { setErrors }) => {
    this.context.startLoading();

    const { email, password } = values;
    await ApolloHelper.initialize(URL);
    const apolloClient = await ApolloHelper.getClient();

    try {
      const { data } = await apolloClient.mutate({
        variables: { email, password },
        mutation: LOGIN_MUTATION
      });
      this.context.stopLoading();

      const { id, token } = data.login.user;

      await authHelpers.authenticate(token, id);

      this.props.navigation.navigate("Home");
    } catch (err) {
      this.context.stopLoading();
      setErrors({
        loginAndPassword: "Ongeldig e-mailadres of wachtwoord"
      });
    }

  }

  render() {
    if (!this.state.loginIsChecked) {
      return null;
    }

    return (
      <Styles.Container>
        <Styles.LeftSide>
          <View>
            <Styles.Title text="Inloggen bij DakApp" />
            <Styles.Description text="Voer uw login gegevens in om verder te gaan." />
            <LoginForm onLogin={this.handleLogin} />
          </View>
        </Styles.LeftSide>
        <Styles.RightSide>
          <Styles.Image source={img} />
        </Styles.RightSide>
      </Styles.Container>
    )
  }
}

Login.contextType = LoaderContext;

export default Login;
