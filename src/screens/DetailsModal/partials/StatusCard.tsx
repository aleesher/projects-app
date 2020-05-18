import React from "react";
import { View } from "react-native";
import _get from "lodash/get";

import { Text, Card } from "dakota-2-portal/src/components";

import { PercentPicker } from "components/.";
import ModalSubtitle from "./ModalSubtitle";
import { IProjectCard } from "components/ProjectCard/models";

interface IProps {
  styles: any;
  project: IProjectCard | {};
  onProgressChange: (projectNumber: string, progress: number) => void;
}

const StatusCard: React.StatelessComponent<IProps> = ({ project, styles, onProgressChange }) => {

  const handleChange = async (newValue: number) => {
    const projectNumber = _get(project, "projectNumber", "");
    await onProgressChange(projectNumber, newValue);
  };

  return (
    <View>
      <ModalSubtitle title="Percentage gereed" />
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.dateUpdated}>geüpdatet op</Text>
            <Text>{_get(project, "percentageDoneDate", "")}</Text>
        </View>
      <Card style={styles.statusCard}>
        <PercentPicker
          value={_get(project, "percentageDone", 0)}
          fontSize={48}
          onChange={([value]) => handleChange(Number(value))}
        />
      </Card>
    </View>
  );
}

export default StatusCard;