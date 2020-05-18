import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "dakota-2-portal/src/themes";
import { Row } from "dakota-2-portal/src/styles/global";

import { CardTitle } from "components/Card";

export const Header = styled(Row)`
  justify-content: space-between;
`;

export const TitleWrapper = styled(Row)`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(CardTitle)`
  margin-bottom: 0;
`;

export const SubTitle = styled(CardTitle)`
  margin-bottom: 0;
  margin-left: 16px;
  font-size: 12px;
  color: ${colors.linkWater};
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const AddText = styled.Text<{ cancel?: boolean }>`
  line-height: 0;
  color: ${({ cancel }) => cancel ? colors.eastBay : colors.gray };
`;

export const AddTextWrapper = styled.View`
  margin-left: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.eastBay};
`;

export const AddIcon = styled(Icon).attrs({ name: "add-circle-outline" })``;

export const RemoveIcon = styled(Icon).attrs({ name: "close" })`
  color: ${colors.venetianRed};
`;

export const PicturesWrapper = styled.View`
  margin-top: 14px;
  margin-bottom: 4px;
  flex-direction: row;
`;
