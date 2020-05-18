import styled from "styled-components";
import { colors as Colors } from "dakota-2-portal/src/themes";

export const ErrorWrapper = styled.View`
  position: absolute;
  left: 4px;
  bottom: 12px;
`;

export const ErrorMessage = styled.Text`
  color: ${Colors.venetianRed};
  font-weight: 600;
`;