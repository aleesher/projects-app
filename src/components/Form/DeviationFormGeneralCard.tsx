import React from "react";

import { Dropdown, TextedRadio } from "dakota-2-portal/src/components";

import {
  CardContainer,
  CardTitle,
  CardText
} from "components/Card";
import { Datepicker } from "components/.";
import {
  DEVIATION_FORM_RADIO_OPTIONS,
  DROPDOWN_OPTIONS
} from "./constants";

import { Column, Row } from "dakota-2-portal/src/styles/global";

export default () => (
  <CardContainer>
    <CardTitle>
      Algemeen
    </CardTitle>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Datum</CardText>
      </Column>
      <Column flex={0.6}>
        <Datepicker />
      </Column>
    </Row>
    <Row marginBottom={23.5}>
      <Column flex={0.4}>
        <CardText>
          Gemeld door
        </CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          onChange={() => null}
          defaultValue="Arjan Reurink"
        />
      </Column>
    </Row>
    <Row>
      <TextedRadio
        flexRatio={0.6}
        text={DEVIATION_FORM_RADIO_OPTIONS.text}
        options={DEVIATION_FORM_RADIO_OPTIONS.options}
        onPress={() => null}
        flexJustify="flex-start"/>
    </Row>
  </CardContainer>
);