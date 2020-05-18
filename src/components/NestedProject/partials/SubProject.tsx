import React from "react";
import { withNavigation } from "react-navigation";
import { compose } from "recompose";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import moment from "moment";

import { Column } from "dakota-2-portal/src/styles/global";
import { withPortraitView } from "dakota-2-portal/src/components";

import { IProjectCard } from "components/ProjectCard/models";
import { PercentPicker, Status } from "components/.";

import { formatPrice } from "helpers/common";
import { getReports } from "helpers/report";
import urls from "helpers/urls";

import * as Styles from "../styles";
import { Statuses, StatusWrapper } from "components/ProjectCard/styles";

interface IProps extends IProjectCard {
  onProjectProgressChange: (projectId: string, progress: number) => void;
  onUpdateProjects: (project: IProjectCard) => void;
  isPortrait?: boolean;
}

const NestedProject = ({
  isPortrait,
  projectNumber,
  percentageDone,
  city,
  contractValue,
  percentageDoneDate,
  description,
  onProjectProgressChange,
  navigation,
  id,
  onUpdateProjects,
  reports
}: IProps) => {

  const [progress, onChangeProgress] = React.useState<number>(percentageDone);

  React.useEffect(() => {
    onChangeProgress(percentageDone);
  }, [percentageDone])

  const generateReportCards = () => {
    return getReports(contractValue, projectNumber, percentageDone, reports);
  }

  const onProgressChange = async (newValue: number) => {
    onChangeProgress(newValue);
    await onProjectProgressChange(projectNumber, newValue);
  };

  const goToDetails = () => {
    navigation.navigate({
      routeName: urls.DETAILS,
      params: {
        project: {
          progress: percentageDone,
          projectNumber,
          id
        },
        onUpdateProjects
      }
    });
  }

  const flexRatio = isPortrait ? {
    firstCell: 0.4,
    secondCell: 0.4,
    thirdCell: 0.2
  } : {
    firstCell: 0.5,
    secondCell: 0.25,
    thirdCell: 0.25
  }

  return (
    <Styles.SecondaryRow onPress={goToDetails}>
      <Styles.Cell flex={flexRatio.firstCell}>
        <Column flex={1} justifyContent="center">
          <Styles.ProjectTitle>
            { description }
          </Styles.ProjectTitle>
          <Styles.InfoWrapper
            flexDirection={isPortrait ? "column" : "row"}
            marginRight={0}>
            <Styles.InfoWrapper>
              <Styles.PrimaryInfo>
                nr.
              </Styles.PrimaryInfo>
              <Styles.SecondaryInfo>
                { projectNumber }
              </Styles.SecondaryInfo>
            </Styles.InfoWrapper>
            <Styles.InfoWrapper>
              <Styles.PrimaryInfo>
                aanneemsom
              </Styles.PrimaryInfo>
              <Styles.SecondaryInfo>
                € {formatPrice(contractValue || 0)}
              </Styles.SecondaryInfo>
            </Styles.InfoWrapper>
            <Styles.InfoWrapper marginRight={0}>
              <Styles.PrimaryInfo>
                plaats
              </Styles.PrimaryInfo>
              <Styles.SecondaryInfo>
                { city }
              </Styles.SecondaryInfo>
            </Styles.InfoWrapper>
          </Styles.InfoWrapper>
        </Column>
      </Styles.Cell>
      <Statuses flex={flexRatio.secondCell} alignSelf="center">
        {generateReportCards().map(({status, title}) => (
          <StatusWrapper key={title + status}>
            <Status status={status} title={title[0]} />
          </StatusWrapper>
        ))}
      </Statuses>

      <Styles.Cell
        flex={flexRatio.thirdCell}
        flexDirection={isPortrait ? "column" : "row"}
        borderType="left">
        <Column flex={0.5}>
          <PercentPicker
            value={progress}
            onChange={([value]) => onProgressChange(Number(value))}
          />
        </Column>
        <Column flex={0.5} alignItems="center" justifyContent="center">
          <Styles.InfoWrapper
            flexDirection="column"
            marginRight={0}>
            <Styles.PrimaryInfo marginRight={isPortrait ? 15 : 0}>
              geüpdatet op
            </Styles.PrimaryInfo>
            <Styles.SecondaryInfo>
              { moment(percentageDoneDate).format("DD-MM-YYYY") }
            </Styles.SecondaryInfo>
          </Styles.InfoWrapper>
        </Column>
      </Styles.Cell>
    </Styles.SecondaryRow>
  );
};

export default compose(
  withPortraitView,
  withNavigation
)(NestedProject);