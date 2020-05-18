import React from "react";

import { Text } from "dakota-2-portal/src/components";

import { formatPrice } from "helpers/common";

import {
  TotalCardContainer
} from "./styles";

interface ITotalCardProps {
  totalPrice: number;
}

export default ({
  totalPrice
}: ITotalCardProps) => (
  <TotalCardContainer>
    <Text size="medium" weight="bold">
      Totaal € { formatPrice(totalPrice) }
    </Text>
  </TotalCardContainer>
)