import React from "react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import moment from "moment";

import { Row } from "dakota-2-portal/src/styles/global";
import { withPortraitView } from "dakota-2-portal/src/components";

import { formatPrice } from "helpers/common";
import { getReports } from "helpers/report";

import SubProject from "./partials/SubProject";

import * as Styles from "./styles";
import { IProjectCard } from "../ProjectCard/models";

interface IProps extends IProjectCard {
  onProjectProgressChange: (projectId: string, progress: number) => void;
  onUpdateProjects: (project: IProjectCard) => void;
  isPortrait?: boolean;
}

const NestedProject = ({
  isPortrait,
  subProjects,
  onProjectProgressChange,
  onUpdateProjects,
  description,
  contractValue,
  percentageDoneDate,
}: IProps) => {
  const [projects, onChangeProjects ] = React.useState<IProjectCard[]>(subProjects);
  const [isOpened, onToggle] = React.useState(false);

  const progress = projects.reduce((total: number, subProject: IProjectCard) =>
      total+=(subProject.contractValue * 100 / contractValue) * (subProject.percentageDone*0.01)
    , 0)

  const handleProjectProgressChange = (projectNumber: string, percentageDone: number) => {
    const idx = projects.findIndex(p => p.projectNumber === projectNumber);
    if(idx > -1) {
      onChangeProjects([
        ...projects.slice(0, idx),
        { ...projects[idx], percentageDone },
        ...projects.slice(idx+1, projects.length)
      ]);
    }
    onProjectProgressChange(projectNumber, percentageDone);
  }

  return (
    <Styles.MainContainer>
      <Styles.MainRow>
        <Row flex={0.8}>
          <Styles.InfoWrapper flexDirection={isPortrait ? "column" : "row"}>
            <Styles.MainProjectTitle>
              { description || "" }
            </Styles.MainProjectTitle>
            <Styles.InfoWrapper>
              <Styles.PrimaryInfo>
                aanneemsom
              </Styles.PrimaryInfo>
              <Styles.SecondaryInfo>
                € {formatPrice(contractValue || 0)}
              </Styles.SecondaryInfo>
            </Styles.InfoWrapper>
            <Styles.InfoWrapper>
              <Styles.PrimaryInfo>
                genormaliseerd gemiddelde
              </Styles.PrimaryInfo>
              <Styles.SecondaryInfo>
                { Math.ceil(progress) }%
              </Styles.SecondaryInfo>
            </Styles.InfoWrapper>
          </Styles.InfoWrapper>
        </Row>
        <Row flex={0.2} flexJustify="flex-end">
          <Styles.InfoWrapper>
            <Styles.DateIcon />
            <Styles.PrimaryInfo marginRight={0}>
              { moment(percentageDoneDate).format("DD-MM-YYYY") }
            </Styles.PrimaryInfo>
          </Styles.InfoWrapper>
        </Row>
        <Styles.MoreIconWrapper onPress={() => onToggle(!isOpened)}>
          <Styles.MoreIcon isOpened={isOpened}/>
        </Styles.MoreIconWrapper>
      </Styles.MainRow>
      {
        isOpened && (
          <Styles.SecondaryContainer>
          { projects.map((subProject: IProjectCard) => (
            <SubProject
              {...subProject}
              key={subProject.id}
              onUpdateProjects={onUpdateProjects}
              onProjectProgressChange={handleProjectProgressChange}
            />
          ))}
          </Styles.SecondaryContainer>
        )
      }
    </Styles.MainContainer>
  );
};

export default withPortraitView(NestedProject);
