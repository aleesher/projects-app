import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";

import { colors as Colors } from "dakota-2-portal/src/themes";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0, 0.1);
`;

export const SettingsIcon = styled(Icon).attrs({ name: "ios-options" })`
  margin-right: 15px;
  transform: rotate(90deg);
  font-size: ${sizePresets.XXLarge.fontSize};
  color: ${Colors.echoBlue};
`;

export const dropdownStyles = {
  flex: 0.25
};

export const dropdownValueStyles = {
  paddingTop: 0,
  paddingRight: 10,
  paddingBottom: 0,
  paddingLeft: 20,
  height: 40,
  borderWidth: 0,
  borderRadius: 50,
  backgroundColor: Colors.lavender
};
