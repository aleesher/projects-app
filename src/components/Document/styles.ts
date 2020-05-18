import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors as Colors } from "dakota-2-portal/src/themes";
import { sizePresets } from "dakota-2-portal/src/components/Text/presets";
import { Text } from "dakota-2-portal/src/components";

import { CardContainer } from "components/Card";

export const DocumentCardWrapper = styled.TouchableOpacity`
  width: 49%;
`;

export const DocumentCard = styled(CardContainer)`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  position: relative;
`;

export const DocumentIcon = styled(Icon)`
  font-size: ${sizePresets.exLarge.fontSize}px;
  color: ${Colors.eastBay};
  margin-right: 16px;
  color: ${Colors.echoBlue};
`;

export const DocumentName = styled(Text).attrs(
  () => ({
    size: "mediumPlus",
    color: "eastBay"
  })
)`
`;

export const DocumentSize = styled(Text).attrs(
  () => ({
    size: "medium",
    color: "echoBlue"
  })
)``;

export const DocumentDownload = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  right: 0px;
`;

export const DocumentDownloadIcon = styled(DocumentIcon)``;