import React from "react";

import { Button, Text } from "dakota-2-portal/src/components";
import { Row } from "dakota-2-portal/src/styles/global";

interface IProps {
  onSave?: () => void;
  onSubmit?: () => void;
}

export default ({
  onSave = () => null,
  onSubmit = () => null
}: IProps) => (
  <Row flexJustify="flex-end">
    <Button
      onPress={onSave}
      kind="dark"
      textStyles={{fontSize: 12}}
      containerStyles={{
        marginRight: 6
      }}
    >
      Opslaan
    </Button>
    <Button
      kind="green"
      textStyles={{fontSize: 12}}
      onPress={onSubmit}
    >
      Opslaan en versturen
    </Button>
  </Row>
);
