import React from "react";

import { Column, RowSpaced } from "dakota-2-portal/src/styles/global";

import VoiceInput from "../VoiceInput";

import { CardText } from "../Card";

interface IProps {
  label: string;
  description?: string;
  marginBottom?: number;
}

export default ({ label, description, marginBottom }: IProps) => (
  <RowSpaced flexAlign="flex-start" marginBottom={marginBottom}>
    <Column flex={0.4} paddingTop={5}>
      <CardText>
        { label }
      </CardText>
      { description &&
        <CardText
          size="small"
          color="echoBlue">
          { description}
        </CardText>
      }
    </Column>
    <Column flex={0.6}>
      <VoiceInput />
    </Column>
  </RowSpaced>
);