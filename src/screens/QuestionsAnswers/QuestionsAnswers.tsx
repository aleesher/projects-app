import React from "react";
import { NavigationScreenProps } from "react-navigation";
import _difference from "lodash/difference";
import _isEmpty from "lodash/isEmpty";

import { SliderLayout, Button, ModalConfirm } from "dakota-2-portal/src/components";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";

import { withPortraitView } from "components/."
import {
  MainTitle,
  MainContainer,
  CardTitle
} from "components/Card";
import FAQ from "./partials/FAQ";
import { fetchFAQs, getFAQsFromStorage, deleteFAQFromDB, removeFAQFromStorage } from "../CreateQuestion/helpers";
import { IFAQ } from "../CreateQuestion/constants";

interface IProps extends NavigationScreenProps {
  isPortrait?: boolean;
}

const QuestionsAnswers = ({
  isPortrait,
  navigation
}: IProps) => {
    const projectNumber = navigation.getParam("projectNumber");
    const tempFAQ = { question: "", answer: "", header: "", projectNumber }
    const [questionId, onToggleQuestion] = React.useState(null);
    const [faqs, setFaqs] = React.useState<IFAQ[]>([]);
    const [FAQToDelete, setFAQToDelete] = React.useState<IFAQ>(tempFAQ);
    const { startLoading, stopLoading } = React.useContext(LoaderContext);

    React.useEffect(() => {
      startLoading();
      fetchFAQs(projectNumber)
        .then(async res => {
          const storageFaqs = await getFAQsFromStorage(projectNumber);
          setFaqs([...storageFaqs, ...res]);
          stopLoading();
        })
        .catch((err) => {
          console.warn(JSON.stringify(err, null, 2));
          stopLoading();
        });
    }, []);

    const handleToggleQuestion = (id) => {
      const resultId = id === questionId ? null : id;
      onToggleQuestion(resultId)
    }

    const handleGoBack = (FAQ: IFAQ, field?: string) => {
      const faq = FAQ.id ? { ...FAQ, tempId: undefined } : FAQ;

      if(!field) {
        return setFaqs([...faqs, faq]);
      }

      const idx = faqs.findIndex(f => f[field] === FAQ[field]);
      if(idx > -1) {
        setFaqs([...faqs.slice(0, idx), faq, ...faqs.slice(idx+1, faqs.length)]);
      } else {
        setFaqs([...faqs, faq]);
      }
    };

    const renderCreateButton = () => (
      <Button
        onPress={() => goToFAQ()}
        kind="dark"
        textStyles={{fontSize: 12}}
        containerStyles={{
          marginRight: 6
        }}>
        Maak een nieuwe vraag
      </Button>
    );

    const goToFAQ = (faq?: IFAQ) =>
      navigation.navigate({
        routeName: "CreateQuestion",
        params: { projectNumber, onGoBack: handleGoBack, faq }})

    const deleteFAQ = async (faq: IFAQ) => {
      setFAQToDelete(tempFAQ);
      startLoading();
      try {
        let field:string = "";
        if(faq.id) {
          field = "id";
          await deleteFAQFromDB(faq);
        } else {
          field = "tempId"
          await removeFAQFromStorage(faq);
        }

        const idx = faqs.findIndex(f => f[field] === faq[field]);

        if(idx > -1) {
          setFaqs([...faqs.slice(0, idx), ...faqs.slice(idx+1, faqs.length)]);;
        }
        stopLoading();
      } catch(err) {
        console.warn(JSON.stringify(err));
        stopLoading();
      }
    }

    const renderConfirmModal = (faq: IFAQ) => {
      return (
        <ModalConfirm
          title="Delete FAQ"
          details={`Are you sure you want to delete the FAQ '${faq.header}'?`}
          cancelText={"Annuleren"}
          confirmText={"Bevestigen"}
          isVisible={!!(faq.id || faq.tempId)}
          onConfirm={() => deleteFAQ(faq)}
          onReject={() => setFAQToDelete(tempFAQ)}
        />
      );
    }

    const publishedFAQs = (faqs || []).filter(f => !!f.id);
    const unPublishedFAQs = _difference(faqs, publishedFAQs);

    return (
      <SliderLayout
        title="Vragen en antwoorden"
        containerStyle={{height: "100%"}}
        headerElement={renderCreateButton()}>
        { renderConfirmModal(FAQToDelete) }
        <MainContainer isPortrait={isPortrait}>
          <MainTitle>
            Vragen en antwoorden
          </MainTitle>
          {!_isEmpty(publishedFAQs) &&
            <CardTitle marginTop={20}>
            Veelgestelde vragen
            </CardTitle>
          }
          { (publishedFAQs || []).map((faq: IFAQ) => {
            return (
            <FAQ
              faq={faq}
              idField="id"
              onToggleQuestion={handleToggleQuestion}
              deleteFAQ={setFAQToDelete}
              questionId={questionId}
              goToFAQ={goToFAQ}
              key={faq.id}
            />
          )})}

          { !_isEmpty(unPublishedFAQs) &&
            <CardTitle marginTop={40}>
              Ongepubliceerde veelgestelde vragen
            </CardTitle>
          }
          { (unPublishedFAQs || []).map((faq: IFAQ) => {
            return (
            <FAQ
              faq={faq}
              idField="tempId"
              onToggleQuestion={handleToggleQuestion}
              deleteFAQ={setFAQToDelete}
              questionId={questionId}
              goToFAQ={goToFAQ}
              key={faq.id}
            />
          )})}
        </MainContainer>
      </SliderLayout>
  );
}

export default withPortraitView(QuestionsAnswers);
