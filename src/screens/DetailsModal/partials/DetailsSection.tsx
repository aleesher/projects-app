import React from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import _get from "lodash/get";
import moment from "moment";

import { Text, Button } from "dakota-2-portal/src/components";
import { colors as Colors } from "dakota-2-portal/src/themes";

import { IProjectCard } from "components/ProjectCard/models";
import { formatPrice, getAuthHeaders } from "helpers/common";
import { MEDIA_URL } from "constants/.";

interface IProps {
  styles: any;
  project: IProjectCard | {};
}

const DetailsSection: React.StatelessComponent<IProps> = ({
  styles,
  project={}
}) => {
  const [headers, setHeaders] = React.useState<any>({});

  React.useEffect(() => {
    getAuthHeaders()
      .then(async (res) => setHeaders(res))
      .catch((err) => console.log(err));
  }, []);

  const renderImageContainer = (path: string) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.imagePreview}
          source={{uri: `${MEDIA_URL}/${path}`, headers }}
        />
        <View style={styles.imageButtonsWrapper}>
          <Button
            kind="dark"
            size="small"
            containerStyles={styles.imageButton}
            textStyles={{fontSize: 12}}
          >
            Vooraanzicht
          </Button>
          <Button
            kind="dark"
            size="small"
            containerStyles={styles.imageButton}
            textStyles={styles.imageButtonDisabledTextStyles}
          >
            Dakvlaktekening
          </Button>
        </View>
      </View>
    );
    }

  const renderDate = (project: IProjectCard | {}, field: string) => {
    const date = _get(project, field, "");
    if(date) {
      const weeknumber = moment(date, "YYYY-MM-DD").week();
      const year = moment(date, "YYYY-MM-DD").year();
      return `week ${weeknumber}, ${year}`;
    }

    return ``;
  }

  const deltaOfHours = false;
  const delta = false;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsInfo}>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            OMSCHRIJVING
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "description", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            STRAAT
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "address", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            PLAATS
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "city", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            PROJECTLEIDER
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "employeeName", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Voorman
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "foreman", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Verwachte startdatum
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { renderDate(project, "expectedStartDate") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
              Aantal dagen
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "numberOfDays", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Verwachte einddatum
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { renderDate(project, "expectedEndDate") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Aantal uren werkbegroting
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "numberOfHourlyWorkBudget", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Aantal uren besteed
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "hoursSpent", "") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Delta
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            <Icon
              name={deltaOfHours ? "add" : "remove"}
              color={deltaOfHours ? Colors.limerick : Colors.cinnabar}
              style={styles.deltaIcon}/>
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Naam onderaannemer
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            { _get(project, "subcontractorName", "-") }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Opdracht
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            € { formatPrice(_get(project, "order", 0)) }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Gefactureerd door
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            € { formatPrice(_get(project, "invoiced", 0)) }
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            size="small"
            style={styles.infoTitle}>
            Delta
          </Text>
          <Text
            size="smallPlus"
            style={styles.infoDescription}>
            <Icon
              name={delta ? "add" : "remove"}
              color={delta ? Colors.limerick : Colors.cinnabar}
              style={styles.deltaIcon}/>
          </Text>
        </View>
      </View>
      { !!_get(project, "complexPhotoUrl") && renderImageContainer(_get(project, "complexPhotoUrl")) }
    </View>
  );
}

export default DetailsSection;
