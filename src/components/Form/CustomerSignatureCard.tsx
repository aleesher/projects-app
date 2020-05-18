import React from "react";

import { TextInput, Sketch } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText,
} from "components/Card";

interface IProps {
  title: string;
  label: string;
  info: string;
}

export default ({
  title,
  label,
  info
}: IProps) => (
  <CardContainer kind="dark">
    <Row marginBottom={16}>
      <CardTitle color="white">
        { title }
      </CardTitle>
    </Row>
    <Row marginBottom={35}>
      <Column flex={0.4}>
        <CardText color="white">
          Naam
        </CardText>
      </Column>
      <Column flex={0.6}>
        <TextInput style={{width: "100%"}} value="Anna Baker"/>
      </Column>
    </Row>
    <Row marginBottom={8}>
      <CardText color="white">
        { label }
      </CardText>
    </Row>
    <Row marginBottom={22}>
      <CardText color="gray" size="small">
        { info }
      </CardText>
    </Row>
    <Sketch />
  </CardContainer>
);