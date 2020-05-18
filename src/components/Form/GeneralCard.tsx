import React from "react";

import { Dropdown, TextedRadio } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText
} from "components/Card";

interface IProps {
  onChange: any;
  radioOptions?: any[];
}

export default ({
  onChange,
  radioOptions
}: IProps) => (
  <CardContainer>
    <CardTitle>
      Algemeen
    </CardTitle>
    <Row marginBottom={10} marginTop={16}>
      <Column flex={0.4}>
        <CardText>Projectnummer</CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={[
            { label: "Mijn projecten", value: "my-projects" },
            { label: "Projecten", value: "projects" }
          ]}
          defaultValue="my-projects"
          onChange={onChange("project-number")}
          disabled
        />
      </Column>
    </Row>
    <Row marginBottom={26}>
      <Column flex={0.4}>
        <CardText>Complexnummer</CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={[
            { label: "Mijn projecten", value: "my-projects" },
            { label: "Projecten", value: "projects" }
          ]}
          defaultValue="my-projects"
          onChange={onChange("complex-number")}
        />
      </Column>
    </Row>
    {radioOptions &&
      radioOptions.map(({ name, text, options}, index: number) => (
        <Column marginTop={index === 0 ? 0 : 38} key={text}>
          <TextedRadio
            text={text}
            options={options}
            onPress={onChange(name)}
            flexRatio={0.6}
            flexJustify="flex-start"
          />
        </Column>
      ))}
  </CardContainer>
);