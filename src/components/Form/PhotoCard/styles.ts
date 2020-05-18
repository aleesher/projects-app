import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "dakota-2-portal/src/themes";

import { CardContainer, CardTitle } from "components/Card";

export const Title = styled(CardTitle)`
  margin-bottom: 0;
`;

export const Container = styled.View`
  position: relative;
  ${({containerWidth, isPortrait}) => {
    if(!isPortrait) {
      return `
        width: 840px;
        padding-right: 38px;
      `;
    }

    return containerWidth !== 0 ? `
      width: ${containerWidth + 38}px;
      padding-right: 38px;
    ` : `
      width: 100%;
    `;
  }}
`;

export const Content = styled(CardContainer)`
  flex-direction: column;
  justify-content: flex-start;
`;

export const PictureReportWrapper = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-top: 25px;
  margin-bottom: 5px;
  border-top-width: 1;
  border-top-color: ${colors.lavender};
`;

export const RemoveReport = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: -62px;
  width: 38px;
  height: 38px;
  border-radius: 50;
  box-shadow: 0 0 6px rgba(0,0,0, 0.1);
  background-color: white;
`;

export const RemoveIcon = styled(Icon).attrs({ name: "close" })`
  font-size: 12px;
  color: ${colors.venetianRed};
`;
