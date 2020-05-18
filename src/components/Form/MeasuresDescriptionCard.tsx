import React from "react";

import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardContainer,
  CardTitle,
  CardText
 } from "components/Card";
 import { VoiceInput } from "components/.";

export default () => (
  <CardContainer>
    <CardTitle>Omschrijving genomen maatregelen</CardTitle>
    <Row marginTop={16}>
      <Column flex={0.4}>
        <CardText>Omschrijving:</CardText>
      </Column>
      <Column flex={0.6}>
        <VoiceInput />
      </Column>
    </Row>
  </CardContainer>
);
