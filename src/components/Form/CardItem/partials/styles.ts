import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "dakota-2-portal/src/themes";

import { Column } from "dakota-2-portal/src/styles/global";

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

export const RadioWrapper = styled(Column)`
  ${({isSubQuestion}) => {
    return isSubQuestion ? `
    background-color: ${colors.ghostWhite};
    padding: 22px;
  ` : ``}
  }
`;

export const Content = styled(CardContainer)`
  flex-direction: column;
  justify-content: flex-start;
`;

export const PictureReportWrapper = styled(Column)`
  flex: 1;
  border-bottom-width: 1;
  padding-bottom: 15px;
  border-bottom-color: ${({hasError}) => !hasError ? colors.lavender : colors.venetianRed};
  margin-bottom: 20px;
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
