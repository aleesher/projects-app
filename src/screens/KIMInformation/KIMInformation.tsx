import React from "react";
import { withApollo } from "react-apollo";
import { compose } from "recompose";
import { Formik } from "formik";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isArray from "lodash/isArray";

import {
  SliderLayout,
  TextedRadio,
  PicturePicker,
  Dropdown,
  TextInput,
  DatePicker,
  Button,
  IDropdownOptionType
} from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";
import AlertService from "dakota-2-portal/src/helpers/AlertService";
import fileHelper, { MEDIA_URL } from "dakota-2-portal/src/helpers/fileHelpers";
import ApolloHelper from "dakota-2-portal/src/helpers/apollo";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";

import { ModalTitle, withPortraitView } from "components/."
import {
  CardContainer,
  CardText,
  MainTitle,
  MainContainer
} from "components/Card";
import { kimInformationSchema } from "./validation";
import {
  FETCH_KIMINFORMATION,
  UPDATE_KIMINFORMATION,
  CREATE_KIMINFORMATION
} from "./queries";
import {
  formatSelectOptions,
  fieldIsInvalid,
} from "helpers/common";
import { COST_CENTER_CODE } from "components/withProjectHandlers/constants";
import {
  getDefaultValues,
  getImageList,
  initValues,
  generateMutationVariables
} from "./helpers";
interface IProps {
  navigation: any;
  isPortrait?: boolean;
}

class KIMInformation extends React.PureComponent<IProps, any> {

  constructor(props) {
    super(props);
    this.state = {
      formikValues: getDefaultValues(),
      userOptions: []
    };
  }

  async componentDidMount() {
    try {
      await this.fetchKimInformation();
    } catch(err) {
      this.handleQueryError(err);
    }
  }

  onSubmit = async (values, ignoreField?) => {
    try {
      const { navigation } = this.props;
      let variables = generateMutationVariables(values, navigation);
      if(ignoreField) {
        variables = { ...variables, [ignoreField]: values[ignoreField]};
      }
      await this.createOrUpdateKimInformation(variables)
      AlertService.show("success", "KIM informatie succesvol opgeslagen");
    } catch(err) {
      console.warn(err);
      console.warn(JSON.stringify(err, null, 2));
      AlertService.show("error", "Fout opslaan");
    }
  }

  handleQueryError = (err) => {
    const { navigation } = this.props;
    console.warn(JSON.stringify(err, null, 2));
    AlertService.show("error", "Fout opslaan");
    navigation.goBack();
  }

  uploadImage = (values: object, fieldName: string) => async (files: any[]) => {
    const { startLoading, stopLoading } = this.context;
    try {
      if(_isArray(values[fieldName]) && values[fieldName].length >= 12) {
        return;
      }
      startLoading();
      const file = files[files.length-1];
      const result = await fileHelper.uploadFile({file, info: { entityName: "KimInformation", fieldName } });
      let value = _get(result, "key", "");
      if(_isArray(values[fieldName])) {
        value = [...values[fieldName], value];
      }
      await this.onSubmit({...values, [fieldName]: value });
      stopLoading();
    } catch(err) {
      stopLoading();
      console.warn(JSON.stringify(err));
    }
  }

  removeImage = (values: object, fieldName: string) => async (path: string) => {
    const { startLoading, stopLoading } = this.context;
    try {
      startLoading();
      const key = path.substring(MEDIA_URL.length+1, path.length);
      const result = await fileHelper.deleteFile(key);
      let value = "";
      if(_isArray(values[fieldName])) {
        value = JSON.stringify(values[fieldName].filter((k: string) => k !== key));
      }
      await this.onSubmit({...values, [fieldName]: value }, fieldName);
      stopLoading();
    } catch(err) {
      stopLoading();
      console.warn(JSON.stringify(err));
    }
  }

  fetchKimInformation = async () => {
    try {
      this.context.startLoading();
      const { navigation } = this.props;
      const { formikValues: { id, ...rest } } = this.state;
      const projectNumber = navigation.getParam("projectNumber") || "";
      const client = await ApolloHelper.getClient();
      const { data } = await client.query({
        query: FETCH_KIMINFORMATION,
        variables: { projectNumber, costCenterCode: COST_CENTER_CODE },
        fetchPolicy: "no-cache"
      });
      const formikValues: any = !_get(data, "kimInformation")
                                  ? { ...rest, projectNumber }
                                  : initValues(data.kimInformation);
      let userOptions:IDropdownOptionType[] = [];
      if(_get(data, "employees")) {
        userOptions = formatSelectOptions(["nameFormal"], _get(data, "employees"));
      }
      this.setState({ formikValues, userOptions });
      this.context.stopLoading();
    } catch(err) {
      this.context.stopLoading();
      this.handleQueryError(err);
      return { formikValues: {}, userOptions: [] }
    }
  }

  createOrUpdateKimInformation = async (variables: object) => {
    try {
      this.context.startLoading();
      const client = await ApolloHelper.getClient();
      const id = _get(variables, "id");
      const mutationType = !!id ? UPDATE_KIMINFORMATION : CREATE_KIMINFORMATION;
      const mutation = { mutation: mutationType, variables };
      const { data } = await client.mutate(mutation);
      const formikValues = initValues(_get(data, "updateKimInformation", _get(data, "createKimInformation")));
      this.setState(() => ({ formikValues }))
      this.context.stopLoading();
     } catch(err) {
      this.context.stopLoading();
      this.handleQueryError(err);
     }
  }

  render() {
    const { isPortrait, navigation } = this.props;
    const { formikValues, userOptions } = this.state;
    const projectNumber = navigation.getParam("projectNumber") || "";

    return (
      <Formik
        onSubmit={kimInformation => this.onSubmit(kimInformation)}
        validationSchema={kimInformationSchema}
        initialValues={formikValues}
        enableReinitialize>
      {({
        handleSubmit,
        values,
        errors,
        handleChange,
        touched,
        handleBlur
      }) => {
        return (
          <SliderLayout
            title={<ModalTitle title="KIM Information" projectNumber={projectNumber} />}
            containerStyle={{}}
            headerElement={
              <Button
                kind="dark"
                textStyles={{fontSize: 12}}
                onPress={() => handleSubmit()}
                disabled={!_isEmpty(errors)}>
                Opslaan
              </Button>
            }>
            <MainContainer isPortrait={isPortrait}>
              <MainTitle>KIM Information</MainTitle>
              <CardContainer>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Projectleider</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <PicturePicker
                      containerStyle={{ marginBottom: 10 }}
                      images={getImageList(values, "projectLeaderPhoto")}
                      onChange={this.uploadImage(values, "projectLeaderPhoto")}
                      format="file"
                      onRemoveImage={this.removeImage(values, "projectLeaderPhoto")}
                    />
                    <Dropdown
                      options={userOptions}
                      onChange={handleChange("projectLeader.name")}
                      defaultValue={_get(values, "projectLeader.name.value")}
                      validationError={fieldIsInvalid(touched, errors, "projectLeader.name")}
                      onBlur={handleBlur("projectLeader.name")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Voorman</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <PicturePicker
                      containerStyle={{ marginBottom: 10 }}
                      images={getImageList(values, "foremanPhoto")}
                      onChange={this.uploadImage(values, "foremanPhoto")}
                      onRemoveImage={this.removeImage(values, "foremanPhoto")}
                      format="file"
                    />
                    <Dropdown
                      options={userOptions}
                      onChange={handleChange("foreman.name")}
                      defaultValue={_get(values, "foreman.name.value")}
                      validationError={fieldIsInvalid(touched, errors, "foreman.name")}
                      onBlur={handleBlur("foreman.name")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Email</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextInput
                      onChangeText={handleChange("email")}
                      value={_get(values, "email", "")}
                      validationError={fieldIsInvalid(touched, errors, "email")}
                      onBlur={handleBlur("email")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Telefoonnummer</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextInput
                      onChangeText={handleChange("phone")}
                      value={_get(values, "phone", "")}
                      validationError={fieldIsInvalid(touched, errors, "phone")}
                      onBlur={handleBlur("phone")}
                    />
                  </Column>
                </Row>
              </CardContainer>

              <CardContainer>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Startdatum</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("startDate")}
                      date={_get(values, "startDate", "")}
                      validationError={fieldIsInvalid(touched, errors, "startDate")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Planning</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextInput
                      onChangeText={handleChange("schedule")}
                      value={_get(values, "schedule", "")}
                      validationError={fieldIsInvalid(touched, errors, "schedule")}
                      onBlur={handleBlur("schedule")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4}>
                    <CardText>Verwachte opleverdatum</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("deliveryDate")}
                      date={_get(values, "deliveryDate", "")}
                      validationError={fieldIsInvalid(touched, errors, "deliveryDate")}
                    />
                  </Column>
                </Row>
              </CardContainer>

              <CardContainer>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Geluid, boren</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("noiseAndDrilling.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "noiseAndDrilling.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndDrilling.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("noiseAndDrilling.date")}
                      date={_get(values, "noiseAndDrilling.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndDrilling.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Geluidsoverlast, grind zuigen en grind blazen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("noiseAndGravel.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "noiseAndGravel.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndGravel.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("noiseAndGravel.date")}
                      date={_get(values, "noiseAndGravel.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndGravel.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Geluidsoverlast, slopen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("noiseAndDemolition.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "noiseAndDemolition.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndDemolition.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("noiseAndDemolition.date")}
                      date={_get(values, "noiseAndDemolition.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "noiseAndDemolition.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Trillingen, slopen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("vibrationDemolition.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "vibrationDemolition.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "vibrationDemolition.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("vibrationDemolition.date")}
                      date={_get(values, "vibrationDemolition.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "vibrationDemolition.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Stof, aanvegen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("dustAndWipe.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "dustAndWipe.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "dustAndWipe.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("dustAndWipe.date")}
                      date={_get(values, "dustAndWipe.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "dustAndWipe.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Stof, slopen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("dustAndDemolish.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "dustAndDemolish.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "dustAndDemolish.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("dustAndDemolish.date")}
                      date={_get(values, "dustAndDemolish.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "dustAndDemolish.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Geur, bitumen</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("smellAndBitumen.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "smellAndBitumen.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "smellAndBitumen.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("smellAndBitumen.date")}
                      date={_get(values, "smellAndBitumen.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "smellAndBitumen.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Geur, coatings</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("smellAndCoatings.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "smellAndCoatings.value", "", "value")}
                      validationError={fieldIsInvalid(touched, errors, "smellAndCoatings.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("smellAndCoatings.date")}
                      date={_get(values, "smellAndCoatings.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "smellAndCoatings.date")}
                    />
                  </Column>
                </Row>
              </CardContainer>
              <CardContainer>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Kraan</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("crane.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "crane.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "crane.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("crane.date")}
                      date={_get(values, "crane.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "crane.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Container</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("container.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "container.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "container.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("container.date")}
                      date={_get(values, "container.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "container.date")}
                    />
                  </Column>
                </Row>
                <Row flexAlign="flex-start" marginBottom={15}>
                  <Column flex={0.4} paddingTop={8}>
                    <CardText>Bouwplaats</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <TextedRadio
                      text=""
                      options={[
                        { title: "ja", value: "yes" },
                        { title: "nee", value: "no" }
                      ]}
                      onPress={handleChange("constructionSite.value")}
                      flexRatio={0.6}
                      flexJustify="flex-start"
                      active={_get(values, "constructionSite.value", "")}
                      validationError={fieldIsInvalid(touched, errors, "constructionSite.value")}
                    />
                    <DatePicker
                      format="w"
                      onDateChange={handleChange("constructionSite.date")}
                      date={_get(values, "constructionSite.date", "")}
                      validationError={fieldIsInvalid(touched, errors, "constructionSite.date")}
                    />
                  </Column>
                </Row>
                <Row marginBottom={15} flexAlign="flex-start">
                  <Column flex={0.4}>
                    <CardText>Foto</CardText>
                  </Column>
                  <Column flex={0.6}>
                    <PicturePicker
                      multiple={12}
                      containerStyle={{ marginBottom: 10 }}
                      images={getImageList(values, "photo")}
                      onChange={this.uploadImage(values, "photo")}
                      format="file"
                      onRemoveImage={this.removeImage(values, "photo")}
                    />
                  </Column>
                </Row>
              </CardContainer>
            </MainContainer>
          </SliderLayout>
      )}}
    </Formik>
    )}
}

KIMInformation.contextType = LoaderContext;

export default compose(
  withPortraitView,
  withApollo
)(KIMInformation);