import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import _map from "lodash/map";
import _get from "lodash/get";

import { Text, Card } from "dakota-2-portal/src/components";
import { TextColorPresetNames } from "dakota-2-portal/src/components/Text/presets";
import { Row } from "dakota-2-portal/src/styles/global";

import ModalSubtitle from "./ModalSubtitle";
import { IProjectCard } from "components/ProjectCard/models";
import { formatPrice } from "helpers/common";
import { FINANCE_FIELDS, IFinanceField } from "../constants";
import { calcFieldValue } from "../helpers";

import styles from "../styles";

interface IProps {
  project: IProjectCard | {};
  isPortrait: boolean;
}

const renderRow = (project: IProjectCard | {}, isPortrait: boolean, statusColor: TextColorPresetNames) => (field: IFinanceField) => {
  return (
    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}} key={field.title}>
      <Text
        size="smallPlus"
        color={field.affected ? statusColor : "echoBlue"}
        style={styles(isPortrait).financeField}>
        { field.title }
      </Text>
      <Text
        size="smallPlus"
        color={field.affected ? statusColor : "echoBlue"}>
        € { field.operation ? formatPrice(calcFieldValue(project, field.operation)) : formatPrice(project[field.key] || 0)}
      </Text>
    </View>
  )
};

const FinanceCard: React.StatelessComponent<IProps> = ({ project={}, isPortrait }) => {
  const statusColor = calcFieldValue(project, "spentVsBudgetted") >= 0 ? "green" : "red";
  return (
    <View style={{position: "relative"}}>
      <ModalSubtitle title="Financieel" color={statusColor}/>
      <Card
        cardWrapperStyle={{paddingVertical: 0}}
        style={styles(isPortrait).financeCard}>
        { _map(FINANCE_FIELDS, renderRow(project, isPortrait, statusColor))  }
        <Row>
          <Text
            size="smallPlus"
            color={"echoBlue"}>
            { _get(project, "projectMemo", "") }
          </Text>
        </Row>
      </Card>
    </View>
  );
};

export default FinanceCard;