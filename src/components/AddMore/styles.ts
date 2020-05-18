import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Text } from "dakota-2-portal/src/components";
import { colors as Colors } from "dakota-2-portal/src/themes";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

export const ButtonContainer = styled.TouchableOpacity`
  
  border-color: ${Colors.lavender};
  border-width: 2;
  border-radius: 6;
  border-style: dashed;
  box-shadow: none;
  background-color: transparent;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 15px 0;
  flex: 1;
  margin-top: ${({
    marginTop
  }) => marginTop ? marginTop : 0};
`;

export const AddIcon = styled(Icon).attrs(() => ({
  name: "add-circle-outline"
}))`
  font-size: ${sizePresets.smallPlus.fontSize}px;
  color: ${Colors.echoBlue};
  margin-right: 6px;
`;

export const PhotoIcon = styled(Icon).attrs(() => ({
  name: "camera-alt"
}))`
  font-size: ${sizePresets.exLarge.fontSize}px;
  color: ${Colors.echoBlue};
  margin-right: 6px;
`;