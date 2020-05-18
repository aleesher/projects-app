import React from "react";
import { View } from "react-native";
import _get from "lodash/get";

import { Text, Card } from "dakota-2-portal/src/components";

import ModalSubtitle from "./ModalSubtitle";

interface IProps {
  styles: any;
  data: any[];
}

const TimeActualInfo: React.StatelessComponent<IProps> = ({ styles, data }) => {
  return (
    <View style={{marginTop: 30}}>
      <ModalSubtitle title="Tijd actuele informatie" />
      <Card style={styles.statusCard}>
        { data.map((item, index) => (
          <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}} key={`actual-info-${index}`}>
            <Text
              size="smallPlus"
              color="echoBlue"
              style={styles.financeField}>
              { item.field }
            </Text>
            <Text
              size="smallPlus">
              { item.value }
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

export default TimeActualInfo;