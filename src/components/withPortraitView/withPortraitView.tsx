import React from "react";
import { Dimensions } from "react-native";

import { isPortraitView } from "helpers/common";

interface IState {
  isPortrait: boolean;
}

export default function withPortraitView(HocComponent) {
  return class extends React.PureComponent<any, IState> {
    constructor(props) {
      super(props);
      this.state = {
        isPortrait: false
      }
    }

    componentDidMount() {
      this.setState({
        isPortrait: isPortraitView()
      }, () => Dimensions.addEventListener('change', this.changeDimension));
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.changeDimension);
    }

    changeDimension = () => {
      this.setState({
        isPortrait: isPortraitView()
      });
    }

    render() {
      const { isPortrait } = this.state;
      return <HocComponent isPortrait={ isPortrait } {...this.props}/>
    }
  }
}