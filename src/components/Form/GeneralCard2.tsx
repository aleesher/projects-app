import React from "react";

import { TextedRadio } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText,
  CardBlock
} from "components/Card";
import { VoiceInput } from "components/.";

interface IProps {
  radioOptions?: any[];
}

export default ({
  radioOptions
}: IProps) => (
  <CardContainer>
    <CardTitle>Algemeen</CardTitle>

    { radioOptions &&
      radioOptions.map(({ text, options}, index: number) => (
        <Row marginTop={index === 0 ? 16 : 24} key={text}>
          <Column flex={1}>
            <TextedRadio
              text={text}
              options={options}
              onPress={() => null}
            />
          </Column>
        </Row>
      ))
    }
    <CardBlock marginTop={20}>
      <Row flexAlign="flex-start">
        <Column flex={0.4} paddingTop={5}>
          <CardText>
            Omschrijf de aangetroffen afwijkingen
          </CardText>
          <CardText
            size="small"
            color="echoBlue">
            Max 250 tekens
          </CardText>
        </Column>
        <Column flex={0.6}>
          <VoiceInput />
        </Column>
      </Row>
    </CardBlock>
  </CardContainer>
);