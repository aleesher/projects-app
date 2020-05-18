import React from "react";

import { Text } from "dakota-2-portal/src/components";
import { colors as Colors } from "dakota-2-portal/src/themes";

import {
  ButtonContainer,
  PhotoIcon,
  AddIcon
} from "./styles";

interface IProps {
  text: string;
  hasAddIcon?: boolean;
  hasPhotoIcon?: boolean;
  marginTop?: number;
  onClick?: () => void;
}

export default ({
  text,
  onClick,
  hasAddIcon,
  hasPhotoIcon,
  marginTop=30
}: IProps) => (
  <ButtonContainer
    kind="white"
    onPress={onClick}
    marginTop={marginTop}
  >
    { hasAddIcon && <AddIcon/> }
    { hasPhotoIcon && <PhotoIcon /> }
    <Text
      color="echoBlue"
      size="smallPlus"
      style={{
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Colors.echoBlue}}
    >
      { text }
    </Text>
  </ButtonContainer>
);