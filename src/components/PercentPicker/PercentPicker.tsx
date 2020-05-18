import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Picker from "react-native-picker";
import _get from "lodash/get";

import { ModalConfirm } from "dakota-2-portal/src/components";

import * as Styles from "./styles";

interface IProps {
  onChange: (value: any) => void;
  value: number;
  min?: number;
  fontSize?: number;
}

interface IState {
  value: number;
  isVisible: boolean;
  newValue: number;
}

class PercentPicker extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(props, state) {
    const { value } = props;
    if (value !== state.value) {
      return { value };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isVisible: false,
      newValue: -1
    }
  }

  handleClick = () => {
    const { value } = this.state;
    const pickerData = Object.keys(Array(101).fill(0, value, 101));

    Picker.init({
      pickerData,
      selectedValue: [value],
      pickerTitleText: "Voortgangspercentage van het project",
      pickerCancelBtnText: "Annuleren",
      pickerConfirmBtnText: "Bevestigen",
      onPickerConfirm: this.handleShowModal
    });
    Picker.show();
  }

  handleConfirm = () =>  {
    const { onChange } = this.props;
    const { newValue } = this.state;
    onChange(newValue);
    this.handleCloseModal();
  }

  handleShowModal = (newValue) =>
    this.setState({
      newValue,
      isVisible: true
    })

  handleCloseModal = () =>
    this.setState({
      newValue: -1,
      isVisible: false
    })

  handleRenderModal = (val: number, isVisible: boolean) => (
    <ModalConfirm
      title="Project's progress"
      details={`Are you sure you want to change the order status to '${val}'?`}
      cancelText={"Annuleren"}
      confirmText={"Bevestigen"}
      isVisible={isVisible}
      onConfirm={this.handleConfirm}
      onReject={this.handleCloseModal}
    />
  )

  render() {
    const { value, newValue, isVisible } = this.state;
    const { fontSize } = this.props;

    return (
      <>
        { this.handleRenderModal(newValue, isVisible) }
        <TouchableOpacity onPress={this.handleClick}>
          <Styles.Container>
            <Styles.Text fontSize={fontSize}>{value}%</Styles.Text>
            <Icon name="expand-more" size={25} />
          </Styles.Container>
        </TouchableOpacity>
      </>
    );
  }
}

export default PercentPicker;
