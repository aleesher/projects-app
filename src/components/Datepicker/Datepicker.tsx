import React from "react";

import { DatePicker, Button } from "dakota-2-portal/src/components";
import { Column, RowSpaced } from "dakota-2-portal/src/styles/global";

interface IProps {
  onChange: (date: any) => void;
  value: string;
  onBlur?: () => void;
}

export default ({ onChange, value, onBlur = () => null }: IProps) => (
  <RowSpaced>
    <Column flex={0.68}>
      <DatePicker onDateChange={onChange} date={value} onCloseModal={onBlur} />
    </Column>
    <Column flex={0.3}>
      <Button kind="dark" size="big" onPress={() => onChange(new Date())}>Vandaag</Button>
    </Column>
  </RowSpaced>
)