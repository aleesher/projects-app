import styled from "styled-components";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";
import { colors } from "dakota-2-portal/src/themes";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
`;

export const Text = styled.Text<{ fontSize?: number }>`
  font-weight: bold;
  font-size: ${props => props.fontSize || sizePresets.XXLarge.fontSize}px;
  color: ${colors.eastBay};
`;
