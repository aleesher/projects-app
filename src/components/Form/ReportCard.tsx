import React from "react";

import VoiceInputContainer from "components/VoiceInputContainer";

import {
  CardTitle,
  CardContainer
} from "components/Card";

export default () => (
  <CardContainer>
    <CardTitle>Verslag</CardTitle>
    <VoiceInputContainer
      label="Voer hier je bevindingen in:"
      description="Maximaal 250 tekens"
      marginBottom={20}
    />
    <VoiceInputContainer
      label="Doorgevoerde veranderingen"
      description="Maximaal 250 tekens"
    />
  </CardContainer>
);
