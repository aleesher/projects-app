import React from "react";

import { TextInput, TextedRadio } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardContainer,
  CardTitle,
  CardText
 } from "components/Card";
 import { VoiceInput } from "components/.";

export default () => (
  <CardContainer>
    <CardTitle>Omschrijving van de vereiste vervolgacties</CardTitle>
    <Row marginTop={16} marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Omschrijving:</CardText>
      </Column>
      <Column flex={0.6}>
        <VoiceInput />
      </Column>
    </Row>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Vervolgactie door:</CardText>
      </Column>
      <Column flex={0.6}>
        <TextInput style={{ flex: 1 }} />
      </Column>
    </Row>
    <Row marginTop={20}>
      <TextedRadio
        text="Spoed?"
        options={[
          { title: "ja", value: "yes" },
          { title: "nee", value: "no" }
        ]}
        onPress={() => null}
        flexRatio={0.6}
        flexJustify="flex-start"
      />
    </Row>
  </CardContainer>
);
