import React from "react";

import { Column, RowSpaced, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText,
  CardLine
} from "components/Card";
import { VoiceInput, AddMore, TotalCard, PriceInput } from "components/.";

export default () => (
  <CardContainer>
    <CardTitle>
      Overzicht aanvullende werkzaamheden
    </CardTitle>
    <CardLine singleLine/>
    <RowSpaced marginBottom={16}>
      <Column flex={0.8}>
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
          <Column flex={0.78}>
            <VoiceInput />
          </Column>
        </Row>
      </Column>
      <Column flex={0.2}>
        <Row flexAlign="flex-start">
          <PriceInput value={12000}/>
        </Row>
      </Column>
    </RowSpaced>
    <AddMore
      text="Rij toevoegen"
      hasAddIcon/>
    <TotalCard totalPrice={12000}/>
  </CardContainer>
);