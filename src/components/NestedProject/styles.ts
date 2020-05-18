import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "dakota-2-portal/src/themes";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";
import { Row, Column } from "dakota-2-portal/src/styles/global";

export const MainContainer = styled.View`
  flex: 1;
  border-radius: 6px;
  margin-bottom: 25px;
  padding-right: 15px;
`;

export const SecondaryContainer = styled.View`
  flex: 1;
`;

// box-shadow: 0 2px 20px 0 rgba(209,209,209,0.4);
export const MainRow = styled(Row)`
  flex: 1;
  padding: 33px 18px 32px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${colors.lavender};
  background-color: ${colors.white};
  position: relative;
`;

export const SecondaryRow = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  background-color: #F9FCFF;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${colors.lavender};
`;

export const Cell = styled.View`
  ${({
    paddingTop="20px",
    paddingHorizontal="20px",
    paddingBottom="20px",
    flexDirection="column",
    borderType="right",
    flex=1
  }) =>`
    padding-top: ${paddingTop};
    padding-horizontal: ${paddingHorizontal};
    padding-bottom: ${paddingBottom};
    flex-direction: ${flexDirection};
    border-${borderType}-width: 0.9px;
    border-style: solid;
    border-color: ${colors.lavender};
    flex: ${flex};
  `}
`;

export const MainProjectTitle = styled.Text`
  color: ${colors.eastBay};
  font-size: ${sizePresets.regular.fontSize}px;
  font-weight: 700;
  line-height: 25px;
  margin-right: 24px;
`;

export const ProjectTitle = styled.Text`
  color: ${colors.eastBay};
  font-weight: 500;
  font-size: ${sizePresets.mediumPlus.fontSize}px;
  margin-bottom: 4px;
`;

export const InfoWrapper = styled.View`
  flex-direction: ${({ flexDirection = "row" }) => flexDirection };
  flex-wrap: wrap;
  margin-right: ${({ marginRight=28 }) => marginRight}px;
`;

export const PrimaryInfo = styled.Text`
  color: ${colors.echoBlue};
  font-size: 14px;
  line-height: 20px;
  margin-right: ${({ marginRight=10}) => marginRight};
`;

export const SecondaryInfo = styled(PrimaryInfo)`
  color: ${colors.eastBay};
  margin-right: 0;
`;

export const DateIcon = styled(Icon).attrs(({
  name="date-range"
}) => ({
  name
}))`
  color: ${colors.eastBay};
  margin-right: 10px;
  font-size: ${sizePresets.regular.fontSize}px;
`;

export const MoreIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: ${colors.eastBay};
  border-radius: 50;
  position: absolute;
  right: -15px;
  justify-content: center;
  align-items: center;
`;

export const MoreIcon = styled(Icon).attrs(({
  name="arrow-forward"
}) => ({
  name
}))`
  font-size: ${sizePresets.smallPlus.fontSize}px;
  color: ${colors.white};
  ${({isOpened}) => isOpened ? "" : "transform: rotate(90deg)"}
`;