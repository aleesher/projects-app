import React from "react";

import { DatePicker, Dropdown, TextedRadio, CheckboxContainer } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import {
  CardTitle,
  CardContainer,
  CardText,
  CardBlock
} from "components/Card";
import { VoiceInput } from "components/.";

interface IProps {
  hasPersonalInjury: boolean;
  isCalled112: boolean;
  onChange: (field: string, value: string | boolean) => void;
}

export default ({
  hasPersonalInjury,
  isCalled112,
  onChange
}: IProps) => (
  <CardContainer>
    <CardTitle>
      Algemeen
    </CardTitle>
    <Row marginBottom={10} flexAlign="flex-start" marginTop={16}>
      <Column flex={0.4}>
        <CardText>Omschrijving</CardText>
      </Column>
      <Column flex={0.6}>
        <VoiceInput />
      </Column>
    </Row>
    <Row marginBottom={10}>
      <Column flex={0.4}>
        <CardText>Type incident</CardText>
      </Column>
      <Column flex={0.6}>
        <Dropdown
          options={[
            { label: "Ongeval, Schade", value: "crash" },
            { label: "Ongeval, Schade2", value: "crash2" }
          ]}
          defaultValue="crash2"
          onChange={() => null}
          disabled
        />
      </Column>
    </Row>
    <Row marginTop={10} marginBottom={20}>
      <TextedRadio
        text="Persoonlijk letsel?"
        options={[
          { title: "ja", value: true },
          { title: "nee", value: false }
        ]}
        onPress={option => onChange("hasPersonalInjury", option)}
        flexRatio={0.6}
        flexJustify="flex-start"
        active={hasPersonalInjury}
      />
    </Row>
    {
      hasPersonalInjury &&
      <CardBlock>
        <Row>
          <TextedRadio
            text="Persoonlijk letsel met ziekenhuis bezoek?"
            options={[
              { title: "ja", value: "yes" },
              { title: "nee", value: "no" }
            ]}
            onPress={() => null}
          />
        </Row>
      </CardBlock>
    }
    <Row marginTop={20} marginBottom={20}>
      <TextedRadio
        text="112 Gebeld?"
        options={[
          { title: "ja", value: true },
          { title: "nee", value: false }
        ]}
        onPress={option => onChange("isCalled112", option)}
        flexRatio={0.6}
        flexJustify="flex-start"
        active={isCalled112}
      />
    </Row>
    {
      isCalled112 &&
      <CardBlock>
        <Row>
          <CheckboxContainer
            label="Betrokken hulpdiensten"
            options={[
              { label: "Politie", value: "police" },
              { label: "Ambulance", value: "ambulance" },
              { label: "Brandweer", value: "fireman" }
            ]}
            onChange={() => null}
            flexRatio={0.6}
            flexJustify="flex-start"
          />
        </Row>
      </CardBlock>
    }
    <Row marginTop={20}>
      <TextedRadio
        text="Opdrachtgever is geinformeerd"
        options={[
          { title: "ja", value: "yes" },
          { title: "nee", value: "no" },
          { title: "onbekend", value: "unknown" }
        ]}
        onPress={() => null}
        flexRatio={0.6}
        flexJustify="flex-start"
      />
    </Row>
  </CardContainer>
);
