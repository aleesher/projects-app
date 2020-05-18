import React from "react";
import { withNavigation, NavigationScreenProps } from "react-navigation";

import { Dropdown, SidebarFooter } from "dakota-2-portal/src/components";
import authHelpers from "dakota-2-portal/src/helpers/authHelpers";

import { SearchInput } from "components/.";
import { EProjectQueryVariant } from "components/withProjectHandlers/models";

import * as Styles from "./styles";

// @ts-ignore
import avatar from "../../../assets/images/builder.png";

interface IProps extends NavigationScreenProps {
  value: string;
  onTypeChange: (value: any) => void;
  onSearch: (value: string) => void;
  placeholder: string;
  hideSidebar: boolean;
}

const Search = ({ onTypeChange, navigation, hideSidebar, ...props }: IProps) => (
  <Styles.SearchContainer>
    <SearchInput {...props} />

    <Dropdown
      rowStyle={{ width: 180 }}
      containerStyle={Styles.dropdownStyles}
      dropdownValueStyle={Styles.dropdownValueStyles}
      options={[
        { label: "Mijn projecten", value: EProjectQueryVariant.MY_PROJECTS },
        { label: "Alle projecten", value: EProjectQueryVariant.ALL_PROJECTS }
      ]}
      defaultValue={EProjectQueryVariant.MY_PROJECTS}
      onChange={onTypeChange}
    />
    { hideSidebar &&
      <SidebarFooter
        avatar={avatar}
        isOpened={false}
        isHeaderElement={true}
        settingsMenu={[{
          title: "Afmelden",
          onPress: async () => {
            await authHelpers.signout();
            navigation.navigate("Login");
          }
        }]}
      />}
  </Styles.SearchContainer>
);

export default withNavigation(Search);
