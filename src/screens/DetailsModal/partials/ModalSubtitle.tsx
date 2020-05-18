import React from "react";
import { View } from "react-native";

import { Text } from "dakota-2-portal/src/components";
import { TextColorPresetNames } from "dakota-2-portal/src/components/Text/presets";

interface IProps {
  children?: React.ReactNode;
  title: string;
  color?: TextColorPresetNames;
  styles?: any;
}

const ModalSubtitle: React.StatelessComponent<IProps> = ({
  children,
  title,
  color="default"
}) => {
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Text size="mediumPlus" style={{fontWeight: "700"}} color={color}>
        { title }
      </Text>
      { children }
    </View>
  );
}

export default ModalSubtitle;