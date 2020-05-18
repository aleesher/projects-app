import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from "dakota-2-portal/src/themes/colors";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

const Block = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  padding: 25px;
`;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: stretch;
  background-color: white;
  border-radius: 4;
`;

export const Statuses = styled(Block)`
  flex: ${({flex="0 1 300px"}) => flex};
  width: 100%;
  flex-wrap: wrap;
  border-left-width: 1px;
  border-left-color: ${Colors.ghostWhite};
  align-self: ${({ alignSelf="stretch" }) => alignSelf }
`;

export const InfoContainer = styled(Block)`
  flex: 0 1 auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Wrapper = styled.View`
  flex: 3;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  position: relative;
  font-weight: bold;
  font-size: ${sizePresets.regular.fontSize}px;
`;

export const InfoTitle = styled.Text`
  margin-right: 4px;
  color: ${Colors.gray};
`;

export const Info = styled.View`
  flex-direction: row;
  margin-right: 25px;
`;

export const Value = styled.Text``;

export const ValuesWrapper = styled.View`
  flex: 0 1 auto;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const MoreWrapper = styled.View`
  justify-content: center;
  position: relative;
  width: 20px;
  background-color: ${Colors.ghostWhite};
`;

export const More = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50;
  background-color: ${Colors.cornFlowerBlue};
  color: ${Colors.white};
`;

export const StatusWrapper = styled.View`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const ProgressContainer = styled.View`
  width: 300px;
  flex-direction: row;
  align-items: center;
  padding: 25px;
  padding-right: 40px;
  border-left-width: 1px;
  border-left-color: ${Colors.ghostWhite};
`;

export const ProgressTitle = styled.Text`
  color: ${Colors.gray};
`;
