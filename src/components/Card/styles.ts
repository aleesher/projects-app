import styled from "styled-components";

import { Text, Card } from "dakota-2-portal/src/components";
import { colors as Colors } from "dakota-2-portal/src/themes";
import {
  TextSizePresetNames,
  TextColorPresetNames
} from "dakota-2-portal/src/components/Text/presets";

interface ITextProps {
  size: TextSizePresetNames,
  color: TextColorPresetNames
}

export const CardContainer = styled(Card)`
  width: 100%;
  border-radius: 6px;
  padding: 30px 40px;
  ${({ kind }) =>
    kind === "dark"
    ? `
      background-color: ${Colors.eastBay};
      shadowColor: rgba(0,0,0,0.8);
    ` : `
      background-color: ${Colors.white};
    `
  }
`;

export const CardBlock = styled.View`
  background-color: ${Colors.ghostWhite};
  padding: 14px;
  flex-basis: 0;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const CardTitle = styled(Text).attrs(({ size, color }: ITextProps) => ({
  size: size ? size : "large",
  color: color ? color : "default"
}))`
  font-weight: 600;
  line-height: 33px;
  margin-bottom: 9px;
  margin-top: ${({marginTop=0}) => `${marginTop}px`};
`;

export const CardSubtitle = styled(Text).attrs(({ size, color }: ITextProps) => ({
  size: size ? size : "regular",
  color: color ? color : "echoBlue"
}))`
  font-weight: 600;
  line-height: 27px;
`;

export const CardLine = styled.View`
  flex: 1;
  height: 1px;
  border: 1px solid ${Colors.lavender};
  ${({ singleLine }) => (
    singleLine ? `
      margin-top: 13px;
      margin-bottom: 26px;
    ` : `
      margin-left: 11px;
    `
  )};
`;

export const CardScrollView = styled.ScrollView`
  margin-bottom: 37px;

  &:last-child {
    margin-bottom: 0
  }
`;

export const CardText = styled(Text).attrs(({
  size,
  color
}: ITextProps) => ({
  size: size ? size : "smallPlus",
  color: color ? color : "default"
}))`
  font-weight: 500;
  line-height: 20px;
`;

export const MainTitle = styled(Text).attrs(() => ({
  size: "XXLarge",
}))`
  line-height: 48;
  font-weight: 600;
`;

export const MainContainer = styled.ScrollView`
  width: ${({ isPortrait }) => isPortrait ? "95%" : "804px"};
  margin: 0 auto;
  padding: 57px 0;
  overflow: visible;
  height: 100%;
  flex: 1;
`;