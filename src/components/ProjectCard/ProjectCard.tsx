import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";
import { View } from "react-native";
import moment from "moment";

import { Text } from "dakota-2-portal/src/components";

import Status from "components/Status";
import { PercentPicker } from "components/.";
import urls from "helpers/urls";
import { formatPrice } from "helpers/common";
import { getReports } from "helpers/report";
import { IProjectCard } from "./models";

import * as Styles from "./styles";

interface IProps extends IProjectCard {
  onProjectProgressChange: (projectNumber: string, progress: number) => void;
  onUpdateProjects: (project: IProjectCard) => void;
  onRefetchProjectList: () => void;
}

const ProjectCard = (props: IProps) => {
  const { percentageDone } = props
  const [progress, onChangeProgress] = React.useState<number>(percentageDone);

  React.useEffect(() => {
    onChangeProgress(percentageDone);
  }, [percentageDone])

  const goToDetails = () => {
    const { navigation, projectNumber, onUpdateProjects, onRefetchProjectList } = props;
    navigation.navigate({
      routeName: urls.DETAILS,
      params: {
        project: {
          progress,
          projectNumber
        },
        onUpdateProjects,
        onRefetchProjectList
      }
    });
  }

  const onProgressChange = async (newValue: number) => {
    const { onProjectProgressChange, projectNumber } = props;
    onChangeProgress(newValue);
    await onProjectProgressChange(projectNumber, newValue);
  };

  const { formReports } = getReports(props);

  return (
    <Styles.Container onPress={goToDetails}>
      <Styles.Wrapper>
        <Styles.InfoContainer>
          <Styles.TitleWrapper>
            <Styles.Title>
              {props.description}
            </Styles.Title>
          </Styles.TitleWrapper>
          <Styles.ValuesWrapper>
            <Styles.Info>
              <Styles.InfoTitle>nr.</Styles.InfoTitle>
              <Styles.Value>{props.projectNumber}</Styles.Value>
            </Styles.Info>
            <Styles.Info>
              <Styles.InfoTitle>aanneemsom</Styles.InfoTitle>
              <Styles.Value>€ {formatPrice(props.contractValue)}</Styles.Value>
            </Styles.Info>
            <Styles.Info>
              <Styles.InfoTitle>plaats</Styles.InfoTitle>
              <Styles.Value>{props.city}</Styles.Value>
            </Styles.Info>
          </Styles.ValuesWrapper>
        </Styles.InfoContainer>
        <Styles.Statuses>
          {formReports.map(({status, title}) => (
            <Styles.StatusWrapper key={title + status}>
              <Status status={status} title={title[0]} />
            </Styles.StatusWrapper>
          ))}
        </Styles.Statuses>
      </Styles.Wrapper>
      <Styles.ProgressContainer>
        <PercentPicker
          value={progress}
          onChange={([value]) => onProgressChange(Number(value))}
        />
        <View>
          <Styles.ProgressTitle>geupdated op</Styles.ProgressTitle>
          <Text>{moment(props.percentageDoneDate).format("DD-MM-YYYY")}</Text>
        </View>
      </Styles.ProgressContainer>
      <Styles.MoreWrapper>
        <Styles.More>
          <Icon name="arrow-forward" size={14} style={{ color: "white" }} />
        </Styles.More>
      </Styles.MoreWrapper>
    </Styles.Container>
  );
};

export default withNavigation(ProjectCard);
