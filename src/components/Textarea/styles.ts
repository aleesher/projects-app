import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { TextInput, Button } from "dakota-2-portal/src/components";
import { colors as Colors } from "dakota-2-portal/src/themes";

export const Textarea = styled(TextInput).attrs((props) => ({
  multiline: true,
  numberOfLines: 4,
  maxLength: 255,
  ...props,
}))`
  width: 100%;
  position: relative;
  padding: 20px 16px 16px;
  height: ${({height}) => height};
`;

export const BorderedTextArea = styled(Textarea)`
  background-color: ${Colors.white};
  border: 2px solid ${Colors.eastBay};
  height: 286;
`;

export const TextAreaWrapper = styled.View`
  position: relative;
  height: ${({ height }) => height };
  background-color: ${Colors.snow};
  flex: 1;
  border-radius: 6;
`;

export const ButtonWrapper = styled.View`
  position: absolute;
  ${({top, right, bottom, left}) => `
    ${top && `top: ${top}`};
    ${right && `right: ${right}`};
    ${bottom && `bottom: ${bottom}`};
    ${left && `left: ${left}`};
  `}
`;;

export const TextAreaButton = styled(Button).attrs(({
  kind="dark",
  icon,
  size="small"
}) => ({
  size,
  kind,
  icon,
  iconStyles: { color: Colors.echoBlue }
}))``;

export const GestureIcon = styled(Icon).attrs(() => ({
  name: "edit"
}))`
  color: ${Colors.echoBlue};
  position: absolute;
  top: 15px;
  right: 15px;
`;