import React from "react";

import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText,
  CardLine
} from "components/Card";
import { VoiceInput, AddMore } from "components/.";

export default () => (
  <CardContainer>
    <CardTitle>
      Opleveringspunten
    </CardTitle>
    <CardLine singleLine/>
    <Row flexAlign="flex-start" marginBottom={16}>
      <Column flex={0.2} paddingTop={5}>
        <CardText>
          Omschrijving
        </CardText>
        <CardText
          size="small"
          color="echoBlue">
          Max 250 tekens
        </CardText>
      </Column>
      <Column flex={0.8}>
        <VoiceInput defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida magna sit amet tempus condimentum. Nullam ac justo vel sapien rhoncus euismod. Sed rutrum auctor nisi."/>
      </Column>
    </Row>
    <Row flexAlign="flex-start">
      <Column flex={0.2} paddingTop={5}>
        <CardText>
          Omschrijving
        </CardText>
        <CardText
          size="small"
          color="echoBlue">
          Max 250 tekens
        </CardText>
      </Column>
      <Column flex={0.8}>
        <VoiceInput />
      </Column>
    </Row>
    <AddMore
      text="Rij toevoegen"
      hasAddIcon/>
  </CardContainer>
);