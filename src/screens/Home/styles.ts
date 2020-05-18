import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from "dakota-2-portal/src/themes/colors";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

export const Container = styled.ScrollView`
  flex: 1;
  backgroundColor: ${Colors.ghostWhite};
`;

export const ProjectsContainer = styled.View`
  padding: 40px;
  padding-right: 15px;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 24px;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 15px;
`;

export const Title = styled.Text`
  font-size: ${sizePresets.XXLarge.fontSize}px;
  font-weight: bold;
  color: ${Colors.limerick};
`;

export const Project = styled.View`
  margin-bottom: 12px;
`;

export const SettingsIcon = styled(Icon).attrs({ name: "settings" })`
  font-size: ${sizePresets.XXLarge.fontSize};
  color: ${Colors.gray};
`;
