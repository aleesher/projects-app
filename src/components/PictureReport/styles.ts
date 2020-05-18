import styled from "styled-components";
import { ViewStyle } from "react-native";

import { Text } from "dakota-2-portal/src/components";
import { colors } from "dakota-2-portal/src/themes";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextareaWrapper = styled.View`
  flex: 0.6;
  padding-top: 10px;
  margin-left: 25px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled(Text)`
  margin-right: 12px;
`;

export const LimitValue = styled(Text).attrs(() => ({
  color: "echoBlue",
  size: "small"
}))``;

export const pickerContainerSTyle: ViewStyle = {
  flex: 0.4,
  alignSelf: "stretch",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 186
};

export const coverSize: ViewStyle = {
  width: "100%",
  height: "100%"
};
