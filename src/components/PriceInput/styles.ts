import styled from "styled-components";

import { Text, TextInput } from "dakota-2-portal/src/components"

export const EuroSign = styled(Text).attrs(() => ({
  size: "medium"
}))`
  margin-right: 13px;
  line-height: 56px;
`;

export const PriceTextInput = styled(TextInput)`
  width: 100%;
`;