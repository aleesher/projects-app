import styled from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import _get from "lodash/get";

import Colors from "dakota-2-portal/src/themes/colors";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  position: absolute;
  top: 10px;
  left: 8px;
  font-size: ${sizePresets.mediumPlus.fontSize}px;
  font-weight: bold;
  color: white;
`;

export const FinishedIcon = styled(FontAwesomeIcon).attrs({ name: "file" })`
  font-size: 34px;
  color: ${Colors.limerick};
`;

export const ProblematicIcon = styled(FinishedIcon)`
  color: ${Colors.lightningYellow};
`;

export const CriticalIcon = styled(FinishedIcon)`
  color: ${Colors.persimmon};
`;

export const CriticalWarningIcon = styled(FontAwesomeIcon).attrs({ name: "warning" })`
  position: absolute;
  z-index: 10;
  right: -3px;
  bottom: -3px;
  font-size: ${sizePresets.medium.fontSize}px;
  color: ${Colors.persimmon};
`;

export const CriticalWarningWhiteIcon = styled(MaterialIcon).attrs({ name: "triangle" })`
  position: absolute;
  z-index: 9;
  right: -5px;
  bottom: -4px;
  font-size: ${_get(sizePresets, "medium.fontSize", 14) + 4}px;
  color: white;
`;
