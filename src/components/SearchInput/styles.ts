import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from "dakota-2-portal/src/themes/colors";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SearchIcon = styled(Icon).attrs({ name: "search" })`
  font-size: ${sizePresets.exLarge.fontSize}px;
  color: ${Colors.echoBlue};
`;

export const TextInputStyles = {
  flex: 1,
  borderWidth: 0,
  fontSize: sizePresets.regular.fontSize
};
