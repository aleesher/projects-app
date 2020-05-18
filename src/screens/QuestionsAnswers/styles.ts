import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Text } from "dakota-2-portal/src/components";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";
import { colors as Colors } from "dakota-2-portal/src/themes";

export const QuestionContainer = styled.TouchableOpacity`
  padding: 15px 52px 15px 30px;
  margin-top: 32px;
  margin-bottom: 0px;
  position: relative;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.01;
  shadowRadius: 0;
  elevation: 0.2;
  background-color: ${Colors.white};
  borderColor: ${Colors.snow};
  borderWidth: 1;
`;

export const Question = styled(Text).attrs(
  () => ({
   size: "mediumPlus",
   color: "echoBLue",
  })
)`
  font-weight: 600;
`

export const Answer = styled(Text).attrs(
  () => ({
    size: "medium",
  })
)`
  margin-top: 8px;
`;

export const ExpandIcon = styled(Icon).attrs(
  ({ expanded }) => ({
    name: expanded ? "expand-less" : "expand-more"
  })
)`
  font-size: ${sizePresets.large.fontSize}px;
  color: ${Colors.eastBay};
  position: absolute;
  top: 15px;
  right: 32px;
`;

export const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: ${({right=64}) => `${right}px`};
`;

export const EditIcon = styled(Icon).attrs(
  () => ({
    name: "create"
  })
)`
  font-size: ${sizePresets.large.fontSize}px;
  color: ${Colors.eastBay};
`;

export const RemoveIcon = styled(EditIcon).attrs(
  () => ({
    name: "clear"
  })
)``;
