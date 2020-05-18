import React from "react";
import { Formik } from "formik";
import { withNavigation, NavigationScreenProps } from "react-navigation";
import { compose } from "recompose";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _filter from "lodash/filter";

import { SliderLayout, TextInput } from "dakota-2-portal/src/components";
import { Row, Column } from "dakota-2-portal/src/styles/global";

import { withPortraitView, HeaderButtons } from "components/."
import {
  MainTitle,
  MainContainer,
  CardText,
  CardContainer
} from "components/Card";
import { fieldIsInvalid, generateUniqueId } from "helpers/common";
import { FAQSchema, IFAQ } from "./constants";
import { saveFAQToStorage, publishFAQ } from "./helpers";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";

interface IProps extends NavigationScreenProps {
  isPortrait?: boolean;
}
const CreateQuestion = ({
  isPortrait,
  navigation
}: IProps) => {
  const projectNumber = navigation.getParam("projectNumber");
  const onGoBack = navigation.getParam("onGoBack");
  const [FAQ, onFAQChange] = React.useState<IFAQ>({ question: "", answer: "", header: "", projectNumber });
  const { startLoading, stopLoading } = React.useContext(LoaderContext);

  React.useEffect(() => {
    const faq = navigation.getParam("faq");
    if(!_isEmpty(faq) && !_isEqual(faq, FAQ)) {
      onFAQChange(faq);
    } else {
      onFAQChange({ ...FAQ, tempId: generateUniqueId() });
    }
  }, []);

  const saveChanges = async (values: IFAQ) => {
    startLoading();
    await saveFAQToStorage(values);
    onGoBack(values, "tempId");
    navigation.goBack();
    stopLoading();
  }

  const submitChanges = async (onSubmit, values: IFAQ) => {
    try {
      onSubmit();

      const { id, tempId, ...rest } = values;
      const errors = _filter(rest, (v) => _isEmpty(v));
      if(_isEmpty(errors) && !id) {
        startLoading();
        const newFAQ = await publishFAQ(values);
        onGoBack({...newFAQ, tempId }, "tempId");
        onFAQChange(newFAQ);
        stopLoading();
        navigation.goBack();
      }
    } catch(err) {
      stopLoading();
      console.warn(JSON.stringify(err));
    }
  }

  return (
    <Formik
      onSubmit={() => null}
      validationSchema={FAQSchema}
      initialValues={FAQ}
      enableReinitialize
    >
      {({
        handleSubmit,
        values,
        errors,
        handleChange,
        touched,
        handleBlur
      }) => (
      <SliderLayout
        title="Vragen en antwoorden"
        containerStyle={{height: "100%"}}
        headerElement={
          <HeaderButtons
            onSubmit={() => submitChanges(handleSubmit, values)}
            onSave={() => saveChanges(values)}
          />
        }>
        <MainContainer isPortrait={isPortrait}>
          <MainTitle>
            Maak een vraag
          </MainTitle>
          <CardContainer>
            <Column flex={1} marginBottom={40}>
              <Row marginBottom={10}>
                <CardText size="regular">Hoofd</CardText>
              </Row>
              <Row>
                <Column flex={1}>
                  <TextInput
                    onChangeText={handleChange("header")}
                    value={_get(values, "header", "")}
                    validationError={fieldIsInvalid(touched, errors, "header")}
                    onBlur={handleBlur("header")}/>
                </Column>
              </Row>
            </Column>
            <Column flex={1} marginBottom={40}>
              <Row marginBottom={10}>
                <CardText size="regular">Vraag</CardText>
              </Row>
              <Row>
                <Column flex={1}>
                  <TextInput
                    onChangeText={handleChange("question")}
                    value={_get(values, "question", "")}
                    validationError={fieldIsInvalid(touched, errors, "question")}
                    onBlur={handleBlur("question")}/>
                </Column>
              </Row>
            </Column>
            <Column flex={1}>
              <Row marginBottom={10}>
                <CardText size="regular">Antwoord</CardText>
              </Row>
              <Row>
                <Column flex={1}>
                  <TextInput
                    onChangeText={handleChange("answer")}
                    value={_get(values, "answer", "")}
                    validationError={fieldIsInvalid(touched, errors, "answer")}
                    onBlur={handleBlur("answer")}/>
                </Column>
              </Row>
            </Column>
          </CardContainer>
        </MainContainer>
      </SliderLayout>
      )}
    </Formik>
  );
}

export default compose(
  withNavigation,
  withPortraitView
)(CreateQuestion);