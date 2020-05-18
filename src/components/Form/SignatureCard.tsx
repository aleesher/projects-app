import React from "react";
import moment from "moment";

import { Dropdown, IDropdownOptionType, Sketch } from "dakota-2-portal/src/components";
import { Column, RowSpaced, Row } from "dakota-2-portal/src/styles/global";

import { Datepicker } from "components/."
import {
  CardTitle,
  CardContainer,
  CardText
} from "components/Card";

interface IProps {
  options: IDropdownOptionType[];
  onChange: any;
  onSignatureChange: any;
  signature?: string;
  title: string;
  label: string;
  info: string;
}
export default ({
  options,
  onChange,
  onSignatureChange,
  signature,
  title,
  label,
  info
}: IProps) => (
  <CardContainer>
    <CardTitle>{ title }</CardTitle>
    <RowSpaced marginTop={20} marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Datum</CardText>
      </Column>
      <Column flex={0.6}>
        <Datepicker
          value={moment().format("YYYY-MM-DD")}
          onChange={() => null}
        />
      </Column>
    </RowSpaced>

    <RowSpaced marginBottom={25}>
      <Column flex={0.4}>
        <CardText>Naam</CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={options}
          onChange={onChange("name")}
          defaultValue="Arjan Reurink"/>
      </Column>
    </RowSpaced>

    <Row marginBottom={5}>
      <CardText>
        { label }
      </CardText>
    </Row>

    <Row marginBottom={22}>
      <CardText
        size="small"
        color="echoBlue">
        { info }
      </CardText>
    </Row>

    <Sketch signature={signature} onChange={onSignatureChange} />
  </CardContainer>
);
