import React from "react";

import { Dropdown } from "dakota-2-portal/src/components";

import {
  CardContainer,
  CardTitle,
  CardText
} from "components/Card";
import {
  VoiceInput, PriceInput
} from "components/.";
import { DROPDOWN_OPTIONS } from "components/Form/constants";

import { Column, Row } from "dakota-2-portal/src/styles/global";

export default () => (
  <CardContainer>
    <CardTitle>Afspraken / Maatregelen</CardTitle>
    <Row
      flexAlign="flex-start"
      marginBottom={10}>
      <Column flex={0.4} paddingTop={15}>
        <CardText>
          Voer hier je afspraken / bevindingen in:
        </CardText>
        <CardText color="gray" size="small">
          Maximaal 250 tekens
        </CardText>
      </Column>
      <Column flex={0.6}>
        <VoiceInput />
      </Column>
    </Row>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Geschatte kosten in euro’s</CardText>
      </Column>
      <Column flex={0.6}>
        <PriceInput value={12000}/>
      </Column>
    </Row>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Geschatte kosten in euro’s</CardText>
      </Column>
      <Column flex={0.6}>
        <PriceInput value={1340}/>
      </Column>
    </Row>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Actie door</CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          onChange={() => null}
          defaultValue="Arjan Reurink"/>
      </Column>
    </Row>
  </CardContainer>
);