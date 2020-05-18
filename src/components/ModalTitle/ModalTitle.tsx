import React from "react";

import { Text } from "dakota-2-portal/src/components";

import { TitleWrapper } from "./styles";

interface IProps {
  title: string;
  projectNumber?: string | number;
}

export default ({
  title,
  projectNumber
}: IProps) => (
  <TitleWrapper>
    <Text
      size="large"
      style={{marginRight: 26}}>
      { title }
    </Text>
    { projectNumber &&
      <Text size="mediumPlus">
        { projectNumber }
      </Text>
    }
  </TitleWrapper>
);