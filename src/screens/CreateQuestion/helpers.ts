import AsyncStorage from "@react-native-community/async-storage";
import _set from "lodash/set";
import _get from "lodash/get";

import ApolloHelper from "dakota-2-portal/src/helpers/apollo";

import { IFAQ } from "./constants";
import { CREATE_FAQ, FETCH_FAQS, DELETE_FAQ } from "./queries";

export const publishFAQ = async (faq: IFAQ) => {
  const client = await ApolloHelper.getClient();
  const { tempId, ...variables } = faq;

  const { data } = await client.mutate({
    mutation: CREATE_FAQ,
    variables
  });

  await removeFAQFromStorage(faq);

  const id = _get(data, "createFaq.id");

  return { ...variables, id };
}

export const fetchFAQs = async (projectNumber: string) => {
  try {
    const client = await ApolloHelper.getClient();
    const { data } = await client.query({
      query: FETCH_FAQS,
      variables: { projectNumber },
      fetchPolicy: "no-cache"
    });
    return _get(data, "faqs", []);
  } catch(err) {
    console.warn(JSON.stringify(err));
  }
}

export const deleteFAQFromDB = async ({ id }: IFAQ) => {
  try {
    const client = await ApolloHelper.getClient();
    const { data } = await client.mutate({
      mutation: DELETE_FAQ,
      variables: { id }
    });
  } catch(err) {
    console.warn(JSON.stringify(err))
  }
}

export const saveFAQToStorage = async (newFaq: IFAQ) => {
  try {
    const faqs: IFAQ[] = await getFAQsFromStorage(newFaq.projectNumber);
    const field = newFaq.id ? "id" : "tempId";
    const idx: number = faqs.findIndex((faq: IFAQ) => faq[field] === newFaq[field]);

    if(idx > -1) {
      _set(faqs, `${[idx]}`, newFaq);
    } else {
      faqs.push(newFaq);
    }

    await AsyncStorage.setItem(`FAQ_${newFaq.projectNumber}`, JSON.stringify(faqs));
  } catch(err) {
    console.warn(JSON.stringify(err));
  }
};

export const getFAQsFromStorage = async (projectNumber: string) => {
  try {
    const faqs = await AsyncStorage.getItem(`FAQ_${projectNumber}`);
    return JSON.parse(faqs || "[]");
  } catch(err) {
    console.warn(JSON.stringify(err));
  }
}

export const removeFAQFromStorage = async (faqToRemove: IFAQ) => {

  if(!faqToRemove.tempId) {
    return;
  }

  const faqs: IFAQ[] = await getFAQsFromStorage(faqToRemove.projectNumber);
  const idx: number = faqs.findIndex((faq: IFAQ) => faq.tempId === faqToRemove.tempId);
  if(idx > -1) {
    const list = [...faqs.slice(0, idx), ...faqs.slice(idx+1, faqs.length)];
    await AsyncStorage.setItem(`FAQ_${faqToRemove.projectNumber}`, JSON.stringify(list));
  }
}